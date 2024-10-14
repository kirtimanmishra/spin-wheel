from django.contrib import admin

from .models import GlobalVoteCount, UserVoteCount

admin.site.register(GlobalVoteCount)
admin.site.register(UserVoteCount)
