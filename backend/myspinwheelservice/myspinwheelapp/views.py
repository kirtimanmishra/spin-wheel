import uuid

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .exceptions import InvalidWinnerParamError, ParamNotFound
from .models import GlobalVoteCount, UserVoteCount
from .serializers import GlobalVoteCountSerializer, UserVoteCountSerializer


class GlobalVoteListView(APIView):
    def get(self, request):
        global_votes = GlobalVoteCount.objects.all()
        serializer = GlobalVoteCountSerializer(global_votes, many=True)
        return Response(serializer.data)

    def post(self, request):
        winner = request.query_params.get("winner")
        VoteListHelper.validate_winner(winner=winner)

        global_vote = GlobalVoteCount.objects.first()
        if not global_vote:
            global_vote = GlobalVoteCount.objects.create()
        VoteListHelper.update_vote_count(global_vote, winner)

        data = {
            "trump_vote_count": global_vote.trump_vote_count,
            "kamala_vote_count": global_vote.kamala_vote_count,
        }
        global_vote_serializer = GlobalVoteCountSerializer(global_vote, data=data)
        global_vote_serializer.is_valid(raise_exception=True)
        global_vote_serializer.save()
        serialized_data = global_vote_serializer.data

        return Response(
            serialized_data,
            status=status.HTTP_200_OK,
        )


class UserVoteListView(APIView):
    def get(self, request):
        user_id = str(request.COOKIES.get("userId"))
        try:
            user_vote = UserVoteCount.objects.get(user_id=user_id)
            serializer = UserVoteCountSerializer(user_vote)
            return Response(serializer.data)
        except UserVoteCount.DoesNotExist:
            return Response(
                {"error": "User id not found."}, status=status.HTTP_404_NOT_FOUND
            )

    def post(self, request):
        winner = request.query_params.get("winner")
        user_id = str(request.COOKIES.get("userId"))

        VoteListHelper.validate_winner(winner=winner)
        VoteListHelper.validate_user_id(user_id=user_id)

        user_vote, _ = UserVoteCount.objects.get_or_create(user_id=user_id)
        VoteListHelper.update_vote_count(user_vote, winner)
        data = {
            "trump_vote_count": user_vote.trump_vote_count,
            "kamala_vote_count": user_vote.kamala_vote_count,
            "user_id": user_vote.user_id,
        }
        user_vote_serializer = UserVoteCountSerializer(user_vote, data=data)
        user_vote_serializer.is_valid(raise_exception=True)
        user_vote_serializer.save()
        serialized_data = user_vote_serializer.data
        return Response(
            serialized_data,
            status=status.HTTP_200_OK,
        )


class VoteListHelper:
    @staticmethod
    def validate_winner(winner):
        if not winner:
            raise ParamNotFound(param=winner)

        valid_choices = ["kamala", "trump"]
        if winner not in valid_choices:
            raise InvalidWinnerParamError(winner, valid_choices)

    @staticmethod
    def validate_user_id(user_id):
        if not user_id:
            raise ParamNotFound(param=user_id)

    @staticmethod
    def update_vote_count(vote_count_instance, winner):
        if winner == "kamala":
            vote_count_instance.kamala_vote_count += 1
        elif winner == "trump":
            vote_count_instance.trump_vote_count += 1
