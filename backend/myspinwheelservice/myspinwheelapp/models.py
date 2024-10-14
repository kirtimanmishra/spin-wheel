import uuid

from django.db import models


class BaseVoteCount(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trump_vote_count = models.IntegerField(default=0)
    biden_vote_count = models.IntegerField(default=0)

    class Meta:
        abstract = True


class GlobalVoteCount(BaseVoteCount):
    def __str__(self):
        return f"Global Vote Count: Trump - {self.trump_vote_count}, Biden - {self.biden_vote_count}"


class UserVoteCount(BaseVoteCount):
    user_id = models.CharField(max_length=255)

    def __str__(self):
        return f"User {self.user_id} Vote Count: Trump - {self.trump_vote_count}, Biden - {self.biden_vote_count}"
