from datetime import date

from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Clearing existing OctoFit data...')
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()

        self.stdout.write('Creating teams...')
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        self.stdout.write('Creating workouts...')
        workouts = {
            'strength': Workout.objects.create(
                name='Super Strength Circuit',
                description='A full-body strength workout fit for a superhero.',
            ),
            'cardio': Workout.objects.create(
                name='Hero Sprint Intervals',
                description='High-intensity sprint intervals to build speed and endurance.',
            ),
            'mobility': Workout.objects.create(
                name='Shield Mobility Flow',
                description='Dynamic mobility work to improve range of motion and recovery.',
            ),
        }

        self.stdout.write('Creating users...')
        users = {
            'ironman': User.objects.create(
                email='ironman@octofit.dev',
                name='Iron Man',
                team=marvel,
            ),
            'captain': User.objects.create(
                email='captain.marvel@octofit.dev',
                name='Captain Marvel',
                team=marvel,
            ),
            'batman': User.objects.create(
                email='batman@octofit.dev',
                name='Batman',
                team=dc,
            ),
            'wonderwoman': User.objects.create(
                email='wonder.woman@octofit.dev',
                name='Wonder Woman',
                team=dc,
            ),
        }

        self.stdout.write('Creating activities...')
        Activity.objects.create(
            user=users['ironman'],
            workout=workouts['strength'],
            date=date(2026, 4, 1),
            duration=45,
        )
        Activity.objects.create(
            user=users['captain'],
            workout=workouts['cardio'],
            date=date(2026, 4, 1),
            duration=30,
        )
        Activity.objects.create(
            user=users['batman'],
            workout=workouts['mobility'],
            date=date(2026, 4, 2),
            duration=25,
        )
        Activity.objects.create(
            user=users['wonderwoman'],
            workout=workouts['strength'],
            date=date(2026, 4, 2),
            duration=50,
        )

        self.stdout.write('Creating leaderboard entries...')
        Leaderboard.objects.create(user=users['ironman'], points=150)
        Leaderboard.objects.create(user=users['captain'], points=135)
        Leaderboard.objects.create(user=users['batman'], points=140)
        Leaderboard.objects.create(user=users['wonderwoman'], points=155)

        self.stdout.write(self.style.SUCCESS('OctoFit database populated successfully with superhero test data.'))
