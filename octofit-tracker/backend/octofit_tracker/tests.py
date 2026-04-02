from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class BasicModelTest(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(str(team), 'Test Team')
    def test_user_creation(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(email='test@example.com', name='Test User', team=team)
        self.assertEqual(str(user), 'test@example.com')
    def test_workout_creation(self):
        workout = Workout.objects.create(name='Pushups', description='Pushups workout')
        self.assertEqual(str(workout), 'Pushups')
    def test_activity_creation(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(email='test@example.com', name='Test User', team=team)
        workout = Workout.objects.create(name='Pushups', description='Pushups workout')
        activity = Activity.objects.create(user=user, workout=workout, date='2026-04-02', duration=30)
        self.assertEqual(str(activity), 'test@example.com - Pushups on 2026-04-02')
    def test_leaderboard_creation(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(email='test@example.com', name='Test User', team=team)
        leaderboard = Leaderboard.objects.create(user=user, points=100)
        self.assertEqual(str(leaderboard), 'test@example.com: 100 pts')
