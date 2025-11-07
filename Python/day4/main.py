# main.py

from menu import display_menu
from student_operations import (
    add_student,
    view_students,
    search_student,
    update_student,
    delete_student,
    view_students_sorted,
    compute_statistics,
)


def main():
    """Main program loop."""
    while True:
        try:
            display_menu()
            choice = input("Enter your choice (1-8): ").strip()

            if choice == "1":
                add_student()
            elif choice == "2":
                view_students()
            elif choice == "3":
                search_student()
            elif choice == "4":
                update_student()
            elif choice == "5":
                delete_student()
            elif choice == "6":
                view_students_sorted()
            elif choice == "7":
                compute_statistics()
            elif choice == "8":
                print("\n Exiting program... Goodbye!\n")
                break
            else:
                print("\n Invalid choice. Please enter a number between 1 and 8.\n")

        except KeyboardInterrupt:
            print("\n\n Program interrupted by user. Exiting safely...\n")
            break
        except Exception as e:
            print(f"\n Unexpected error occurred: {e}\n")


if __name__ == "__main__":
    main()
