def generate_recommendations(data):

    tasks = data.get("tasks", [])
    notes = data.get("notes", [])

    recommendations = []

    pending = [
        t for t in tasks
        if t.get("status") == "pending"
    ]

    completed = [
        t for t in tasks
        if t.get("status") == "completed"
    ]

    total = len(tasks)

    completion_rate = (
        len(completed) / total * 100
        if total > 0 else 0
    )

    if completion_rate < 50:
        recommendations.append(
            "Focus on completing existing tasks before creating new ones."
        )

    if len(notes) < 3:
        recommendations.append(
            "Create more study notes for revision."
        )

    if len(pending) > 0:
        recommendations.append(
            f"You have {len(pending)} pending task(s). Prioritize them."
        )

    subjects = {}

    for task in tasks:
        subject = task.get("subject")

        if subject:
            subjects[subject] = (
                subjects.get(subject, 0) + 1
            )

    if subjects:
        weakest = min(
            subjects,
            key=subjects.get
        )

        recommendations.append(
            f"Spend more time studying {weakest}."
        )

    return recommendations