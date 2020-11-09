drop database betterworkout;
create database betterworkout;
use betterworkout;

create table workouts(
	nameOfWorkout varchar(50) not null,
    defaultDescription varchar(50) not null,
	constraint nameOfWorkout primary key (nameOfWorkout)
);

create table exercises(
    exerciseName varchar(50) not null,
    muscleGroup varchar(50) not null,
    defaultReps int not null,
    defaultSets int not null,
    constraint exerciseName primary key (exerciseName)
);

create table workoutExercises(
	workoutID varchar(50) not null,
    exerciseID varchar(50) not null,
    timeperexercise int not null,
    numberofrounds int not null,
    restbetweenexcersie int not null,
    restbetweenrounds int not null,
    foreign key (exerciseID) references exercises(exerciseName),
	foreign key (workoutID) references workouts(nameOfWorkout)
);




//insert 
use betterworkout;
INSERT INTO exercises (exerciseName,muscleGroup,defaultReps,DefaultSets) VALUES 
    ("Walking High Knees", "Full body",10,3),("Upright Row","Upper Body",10,5),("Overhead Shoulder Press","Upper Body",15,5),
    ("Side-lying Leg Raises","Lower Body",13,5),("Bent Over Rows","Upper Body",10,4),("Leg Scissors","Lower Body",13,3),
    ("Lateral Shuffles","Full Body",13,5),("Donkey Kicks","Lower Body",15,4),("Squats","Lower Body",12,5),
    ("Hammer Curls","Upper Body",14,5),("Hip Bridge","Lower Body",10,3),("Russian twist","Abs",12,4),
    ("Mountain Climbers","Full Body",15,3),("Heel Touches","Abs",12,4),("Reverse Crunches","Abs",13,4),
    ("Pulsing Squats","Lower Body",15,5),("Standing Twists","Full body",10,5),
    ("Elevator Squats","Lower body",13,3),("Sumo Squats","Lower body",13,5),
    ("Rocking Planks","Abs",15,3),("Supermans","Abs",15,5),("Push-ups","Upper body",10,5),
    ("Curtsy Lunges","Upper body",14,3),("Pull ups","Upper body",15,3),
    ("Squat Kicks","Lower body",13,3),("Crunches","Abs",12,4),("Jump Rope","Full body",12,3),
    ("Jumping Jacks","Full body",14,5),("Plank","Full body",13,5),
    ("Burpees","Full body",15,5),("Tricep Extensions","Upper body",10,4),
    ("Bicep Curls","Upper body",13,5),("Box Jumping","Lower Body",10,4),("Front Lateral Raises","Upper Body",13,5),
    ("Big Arm Circles","Lower Body",11,3),("Lunges","Lower body",10,5);


insert into workouts values ('Gards Routine', 'Testing the database');
insert into workouts values ('Jordans Routine', 'Testing the database');
insert into workouts values ('Wills Routine', 'Testing the database');
insert into workouts values ('Kemis Routine', 'Testing the database');

insert into workoutExercises values ('Gards Routine','Push-ups', 10, 10, 10, 10);
insert into workoutExercises values ('Gards Routine','Sit-ups', 10, 10, 10, 10);
insert into workoutExercises values ('Gards Routine','Burpees', 10, 10, 10, 10);
insert into workoutExercises values ('Gards Routine','Squats', 10, 10, 10, 10);

insert into workoutExercises values ('Jordans Routine','Push-ups', 10, 10, 10, 10);
insert into workoutExercises values ('Jordans Routine','Sit-ups', 10, 10, 10, 10);
insert into workoutExercises values ('Jordans Routine','Burpees', 10, 10, 10, 10);
insert into workoutExercises values ('Jordans Routine','Squats', 10, 10, 10, 10);

insert into workoutExercises values ('Wills Routine','Push-ups', 10, 10, 10, 10);
insert into workoutExercises values ('Wills Routine','Sit-ups', 10, 10, 10, 10);
insert into workoutExercises values ('Wills Routine','Burpees', 10, 10, 10, 10);
insert into workoutExercises values ('Wills Routine','Squats', 10, 10, 10, 10);
 
insert into workoutExercises values ('Kemis Routine','Push-ups', 10, 10, 10, 10);
insert into workoutExercises values ('Kemis Routine','Sit-ups', 10, 10, 10, 10);
insert into workoutExercises values ('Kemis Routine','Burpees', 10, 10, 10, 10);
insert into workoutExercises values ('Kemis Routine','Squats', 10, 10, 10, 10);



//query
use betterworkout;

SELECT exerciseID, timeperexercise, numberofrounds, restbetweenexcersie, restbetweenrounds FROM workoutExercises WHERE workoutID like 'Gards%';



