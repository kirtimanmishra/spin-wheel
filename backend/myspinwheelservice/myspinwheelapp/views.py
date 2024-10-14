import uuid

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import GlobalVoteCount, UserVoteCount
from .serializers import (
    GlobalVoteCountSerializer,
    UserVoteCountSerializer,
    VoteSerializer,
)


class RecordVoteView(APIView):
    def get(self, request):
        print("*** here *** ")
        message = "Success"
        return Response(message, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = VoteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        winner = serializer.validated_data["winner"]

        user_id = request.COOKIES.get("userId")

        global_vote, _ = GlobalVoteCount.objects.get_or_create(id=uuid.uuid4())

        self.update_vote_count(global_vote, winner)

        global_vote_serializer = GlobalVoteCountSerializer(global_vote)
        global_vote_serializer.is_valid(raise_exception=True)
        global_vote_serializer.save()

        if user_id:
            user_vote, _ = UserVoteCount.objects.get_or_create(user_id=user_id)

            self.update_vote_count(user_vote, winner)

            user_vote_serializer = UserVoteCountSerializer(user_vote)
            user_vote_serializer.is_valid(raise_exception=True)
            user_vote_serializer.save()

            return Response(
                {"message": "Vote recorded successfully for user and globally."},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "No user ID found in cookies."},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update_vote_count(self, vote_count_instance, winner):
        if winner == "biden":
            vote_count_instance.biden_vote_count += 1
        elif winner == "trump":
            vote_count_instance.trump_vote_count += 1


class GlobalVoteListView(APIView):
    def get(self, request):
        print("*** here 1 *** ")

        global_votes = GlobalVoteCount.objects.all()
        serializer = GlobalVoteCountSerializer(global_votes, many=True)
        return Response(serializer.data)


class UserVoteListView(APIView):
    def get(self, request, user_id):
        print("*** here 2 *** ")
        try:
            user_vote = UserVoteCount.objects.get(user_id=user_id)
            serializer = UserVoteCountSerializer(user_vote)
            return Response(serializer.data)
        except UserVoteCount.DoesNotExist:
            return Response(
                {"error": "User votes not found."}, status=status.HTTP_404_NOT_FOUND
            )
