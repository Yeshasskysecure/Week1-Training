# da3_training.py
"""
Simple OOP Practice Project - Employee Management
Topics: Classes, Methods, Inheritance, File Handling
"""

# -----------------------------
# 1. Base Class: Employee
# -----------------------------
class Employee:
    def __init__(self, emp_id, name, salary):
        self.emp_id = emp_id
        self.name = name
        self.salary = salary

    def show_info(self):
        print(f"ID: {self.emp_id}, Name: {self.name}, Salary: {self.salary}")

# -----------------------------
# 2. Child Class: Manager
# -----------------------------
class Manager(Employee):  # Inherits from Employee
    def __init__(self, emp_id, name, salary, department):
        super().__init__(emp_id, name, salary)
        self.department = department

    def show_info(self):  # Overriding method
        print(f"ID: {self.emp_id}, Name: {self.name}, Salary: {self.salary}, Department: {self.department}")

# -----------------------------
# 3. File Handling Functions
# -----------------------------
def save_to_file(filename, employees):
    with open(filename, "w") as file:
        for emp in employees:
            if isinstance(emp, Manager):
                file.write(f"{emp.emp_id},{emp.name},{emp.salary},{emp.department}\n")
            else:
                file.write(f"{emp.emp_id},{emp.name},{emp.salary}\n")
    print("✅ Data saved!")

def load_from_file(filename):
    employees = []
    try:
        with open(filename, "r") as file:
            for line in file:
                parts = line.strip().split(",")
                if len(parts) == 3:
                    employees.append(Employee(parts[0], parts[1], parts[2]))
                else:
                    employees.append(Manager(parts[0], parts[1], parts[2], parts[3]))
    except FileNotFoundError:
        print("⚠️ File not found!")
    return employees

# -----------------------------
# 4. Main Program
# -----------------------------
def main():
    # Create some employees
    emp1 = Employee("101", "Alice", "50000")
    emp2 = Employee("102", "Bob", "45000")
    mgr1 = Manager("201", "Charlie", "80000", "IT")

    employees = [emp1, emp2, mgr1]

    print("\nEmployee Details:")
    for emp in employees:
        emp.show_info()

    # Save to file
    save_to_file("employees.txt", employees)

    # Load from file
    print("\nLoaded from file:")
    loaded_employees = load_from_file("employees.txt")
    for emp in loaded_employees:
        emp.show_info()

if __name__ == "__main__":
    main()
