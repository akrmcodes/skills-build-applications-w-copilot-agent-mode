from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users
        users = [
            User.objects.create(email='ironman@marvel.com', name='Iron Man', team=marvel),
            User.objects.create(email='captain@marvel.com', name='Captain America', team=marvel),
            User.objects.create(email='spiderman@marvel.com', name='Spider-Man', team=marvel),
            User.objects.create(email='batman@dc.com', name='Batman', team=dc),
            User.objects.create(email='superman@dc.com', name='Superman', team=dc),
            User.objects.create(email='wonderwoman@dc.com', name='Wonder Woman', team=dc),
        ]

        # Create Workouts
        pushups = Workout.objects.create(name='Pushups', description='Pushups workout')
        running = Workout.objects.create(name='Running', description='Running workout')
        yoga = Workout.objects.create(name='Yoga', description='Yoga session')

        # Create Activities
        Activity.objects.create(user=users[0], workout=pushups, date=timezone.now().date(), duration=30)
        Activity.objects.create(user=users[1], workout=running, date=timezone.now().date(), duration=45)
        Activity.objects.create(user=users[2], workout=yoga, date=timezone.now().date(), duration=60)
        Activity.objects.create(user=users[3], workout=pushups, date=timezone.now().date(), duration=20)
        Activity.objects.create(user=users[4], workout=running, date=timezone.now().date(), duration=50)
        Activity.objects.create(user=users[5], workout=yoga, date=timezone.now().date(), duration=40)

        # Create Leaderboard
        Leaderboard.objects.create(user=users[0], points=120)
        Leaderboard.objects.create(user=users[1], points=110)
        Leaderboard.objects.create(user=users[2], points=100)
        Leaderboard.objects.create(user=users[3], points=130)
        Leaderboard.objects.create(user=users[4], points=125)
        Leaderboard.objects.create(user=users[5], points=115)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data!'))
