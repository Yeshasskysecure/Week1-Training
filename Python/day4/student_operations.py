# student_operations.py

FILE_NAME = "students.txt"


def load_students():
    """Load student records safely.

    Returns a list of dictionaries with keys: name (str), age (int), grade (float).
    Malformed lines are ignored.
    """
    students = []
    try:
        with open(FILE_NAME, "r") as f:
            for line in f:
                parts = line.strip().split(",")
                if len(parts) != 3:
                    continue
                name, age_str, grade_str = parts
                try:
                    age = int(age_str)
                    grade = float(grade_str)
                except ValueError:
                    continue
                students.append({"name": name.strip(), "age": age, "grade": grade})
    except FileNotFoundError:
        # No file yet -> return empty list
        return []
    return students


def save_students(students):
    """Overwrite the file with provided student list (list of dicts)."""
    with open(FILE_NAME, "w") as f:
        for s in students:
            f.write(f"{s['name']},{s['age']},{s['grade']}\n")


def add_student():
    """Add a new student record to the file, ensuring valid CSV format."""
    try:
        name = input("Enter student name: ").strip()
        if not name:
            raise ValueError("Name cannot be empty.")

        age_input = input("Enter age: ").strip()
        if not age_input.isdigit():
            raise ValueError("Age must be a valid number.")
        age = int(age_input)

        grade_input = input("Enter grade: ").strip()
        try:
            grade = float(grade_input)
        except ValueError:
            raise ValueError("Grade must be a valid number (e.g., 8.5).")

        # Save strictly as CSV (no labels)
        with open(FILE_NAME, "a") as f:
            f.write(f"{name},{age},{grade}\n")

        print(f"\nStudent '{name}' added successfully.\n")

    except ValueError as e:
        print(f"\nError: {e}\n")
    except Exception as e:
        print(f"\nUnexpected error: {e}\n")


def view_students():
    """Display all student records safely, ignoring malformed lines."""
    try:
        students = load_students()

        if not students:
            print("\nNo students found.\n")
            return

        print("\nStudent Records")
        print("-" * 30)
        for idx, s in enumerate(students, start=1):
            print(f"{idx}. Name: {s['name']}, Age: {s['age']}, Grade: {s['grade']}")

        print("-" * 30 + "\n")

    except Exception as e:
        print(f"\nError while viewing students: {e}\n")




def search_student():
    """Search for students by name (case-insensitive, partial match)."""
    try:
        name_to_search = input("Enter student name to search: ").strip().lower()
        if not name_to_search:
            raise ValueError("Search name cannot be empty.")

        students = load_students()
        matches = [s for s in students if name_to_search in s["name"].lower()]

        if matches:
            print("\nMatches found:")
            for s in matches:
                print(f"- {s['name']} (Age: {s['age']}, Grade: {s['grade']})")
            print()
        else:
            print(f"\n No student found matching '{name_to_search}'.\n")

    except ValueError as e:
        print(f"\n Error: {e}\n")
    except Exception as e:
        print(f"\n Unexpected error: {e}\n")


def update_student():
    """Update a student's details by exact name match (case-insensitive)."""
    try:
        target = input("Enter the exact student name to update: ").strip()
        if not target:
            raise ValueError("Name cannot be empty.")

        students = load_students()
        idx = next((i for i, s in enumerate(students) if s["name"].lower() == target.lower()), None)
        if idx is None:
            print(f"\n No student found with the name '{target}'.\n")
            return

        current = students[idx]
        print("\nLeave a field blank to keep the current value.")
        new_name = input(f"New name [{current['name']}]: ").strip()
        new_age = input(f"New age [{current['age']}]: ").strip()
        new_grade = input(f"New grade [{current['grade']}]: ").strip()

        if new_name:
            current["name"] = new_name
        if new_age:
            if not new_age.isdigit():
                print(" Invalid age. Update cancelled.\n")
                return
            current["age"] = int(new_age)
        if new_grade:
            try:
                current["grade"] = float(new_grade)
            except ValueError:
                print(" Invalid grade. Update cancelled.\n")
                return

        students[idx] = current
        save_students(students)
        print("\n Student updated successfully.\n")

    except Exception as e:
        print(f"\n Unexpected error: {e}\n")


def delete_student():
    """Delete the first student that matches the exact name (case-insensitive)."""
    try:
        target = input("Enter the exact student name to delete: ").strip()
        if not target:
            raise ValueError("Name cannot be empty.")

        students = load_students()
        idx = next((i for i, s in enumerate(students) if s["name"].lower() == target.lower()), None)
        if idx is None:
            print(f"\n No student found with the name '{target}'.\n")
            return

        removed = students.pop(idx)
        save_students(students)
        print(f"\n Student '{removed['name']}' deleted successfully.\n")

    except Exception as e:
        print(f"\n Unexpected error: {e}\n")


def view_students_sorted():
    """View students sorted by name, age, or grade."""
    try:
        students = load_students()
        if not students:
            print("\nNo students found.\n")
            return

        key = input("Sort by (name/age/grade): ").strip().lower()
        if key not in {"name", "age", "grade"}:
            print(" Invalid sort key.\n")
            return
        order = input("Order (asc/desc) [asc]: ").strip().lower() or "asc"
        reverse = order == "desc"

        students.sort(key=lambda s: s[key], reverse=reverse)
        print("\nSorted Students")
        print("-" * 30)
        for idx, s in enumerate(students, start=1):
            print(f"{idx}. Name: {s['name']}, Age: {s['age']}, Grade: {s['grade']}")
        print("-" * 30 + "\n")

    except Exception as e:
        print(f"\n Unexpected error: {e}\n")


def compute_statistics():
    """Compute and display basic statistics for students."""
    try:
        students = load_students()
        if not students:
            print("\nNo students found.\n")
            return

        count = len(students)
        avg_age = sum(s["age"] for s in students) / count
        avg_grade = sum(s["grade"] for s in students) / count
        top = max(students, key=lambda s: s["grade"])
        low = min(students, key=lambda s: s["grade"])

        print("\nStatistics")
        print("-" * 30)
        print(f"Total students: {count}")
        print(f"Average age: {avg_age:.2f}")
        print(f"Average grade: {avg_grade:.2f}")
        print(f"Top grade: {top['grade']:.2f} ({top['name']})")
        print(f"Lowest grade: {low['grade']:.2f} ({low['name']})")
        print("-" * 30 + "\n")

    except Exception as e:
        print(f"\n Unexpected error: {e}\n")
