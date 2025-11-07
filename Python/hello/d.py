# ========================
# 🔹 1. Special Data Types
# ========================

# None
x = None
print(x is None)  # True

def do_nothing():
    ...
print(do_nothing() is None)  # True

# NotImplemented
class CustomNumber:
    def __add__(self, other):
        if isinstance(other, int):
            return 42 + other
        return NotImplemented

num = CustomNumber()
print(num + 3)  # 45
# print(3 + num)  # Would raise TypeError

# Ellipsis (...)
def unimplemented_function():
    ...
    # Placeholder for future code

# Slicing with Ellipsis (used in NumPy, etc.)
import numpy as np
array = np.array([[1, 2, 3], [4, 5, 6]])
print(array[..., 1])  # [2 5]


# =========================
# 🔹 2. Numeric Data Types
# =========================

num_int = 42
num_float = 3.14159
num_complex = 3 + 4j

print(type(num_int), type(num_float), type(num_complex))
print(num_int + 10)
print(num_float * 2)
print(num_complex.real, num_complex.imag)

# Casting
print(int("100"))       # 100
print(float("100.5"))   # 100.5


# ======================
# 🔹 3. String Data Type
# ======================

msg = "Hello, Python!"
print(msg.upper())
print(msg.lower())
print(msg.title())
print(msg.replace("Python", "World"))

# Indexing and slicing
print(msg[0])    # 'H'
print(msg[-1])   # '!'
print(msg[0:5])  # 'Hello'

# Concatenation and formatting
name = "John"
print("Welcome, " + name)
print("Welcome, {}!".format(name))
print(f"Welcome, {name}!")

# Common string checks
print(msg.isalpha())   # False
print(msg.startswith("Hello"))  # True


# ========================
# 🔹 4. Boolean Data Type
# ========================

is_alive = True
is_coding = False

print(is_alive and not is_coding)  # True

# Truthy and Falsy examples
values = [(), [], {}, set(), 0, 0.0, "", None]
for v in values:
    print(bool(v), "→", v)  # All are False

# Boolean arithmetic
print(True + 1)  # 2
print(False * 10)  # 0


# =======================
# 🔹 5. Binary Data Types
# =======================

# Bytes (immutable)
b = b"hello"
print(b, b[0], b[1:3])  # b'hello' 104 b'el'

# Encode/Decode string
encoded = "Python".encode("utf-8")
print(encoded, encoded.decode("utf-8"))

# Bytearray (mutable)
ba = bytearray(b"hello")
ba[0] = 72  # 'H'
ba.append(33)  # Add '!'
print(ba)  # bytearray(b'Hello!')

# Memoryview (no data copy)
mv = memoryview(b"example")
print(mv[1:4].tobytes())  # b'xam'


# ==================================
# 🔹 6. Quick Type and Identity Demo
# ==================================

a = [1, 2, 3]
b = a
c = [1, 2, 3]

print(a is b)  # True (same object)
print(a == c)  # True (same value)
print(type(a))  # <class 'list'>
print(id(a))    # Memory address

