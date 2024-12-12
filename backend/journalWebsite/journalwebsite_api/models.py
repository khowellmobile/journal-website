from django.db import models

class Posts(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    post_title = models.CharField(max_length=255)
    post_text = models.TextField()
    post_links = models.JSONField(default=dict)
    is_favorite = models.BooleanField(default=False)
    

