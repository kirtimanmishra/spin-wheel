from rest_framework import serializers

from .models import GlobalVoteCount, UserVoteCount


class GlobalVoteCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalVoteCount
        fields = "__all__"


class UserVoteCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVoteCount
        fields = "__all__"


class VoteSerializer(serializers.Serializer):
    winner = serializers.ChoiceField(choices=["biden", "trump"])
