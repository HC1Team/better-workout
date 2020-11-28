import React from 'react'
import Exercise from "./Exercise"

export default function ExerciseList({ exercises }) {
    return (

        // exercises.length
        exercises.map(exercise => {
            return <Exercise key = {exercise.id} exercise = {exercise} />
        })
    )
}
