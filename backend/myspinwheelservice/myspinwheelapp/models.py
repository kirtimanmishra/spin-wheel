import uuid

from django.db import models


class BaseVoteCount(models.Model):
    trump_vote_count = models.IntegerField(default=0)
    kamala_vote_count = models.IntegerField(default=0)

    class Meta:
        abstract = True


class GlobalVoteCount(BaseVoteCount):
    def __str__(self):
        return f"Trump: {self.trump_vote_count}, Kamala; {self.kamala_vote_count}"


class UserVoteCount(BaseVoteCount):
    user_id = models.CharField(max_length=255)

    def __str__(self):
        return f"USER id: {self.id}, Trump: {self.trump_vote_count}, Kamala: {self.kamala_vote_count}, user_id:{self.user_id}"
