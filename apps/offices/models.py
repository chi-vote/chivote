from django.db import models
from apps.places.models import Place


class Office(models.Model):
    # someday these could be subclassed if necessary
    # but that's potentially complicated to implement
    name = models.CharField(max_length=40)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']

    # TODO sort out incumbency stuff later
    """
    lame_duck = models.CharField(max_length=50,null=True) # an incumbent who isn't running
    incumbent_candidate = models.ForeignKey(Candidate,null=True,on_delete=models.CASCADE)
    def incumbent(self):
        return self.incumbent if self.incumbent else self.lame_duck
    """
