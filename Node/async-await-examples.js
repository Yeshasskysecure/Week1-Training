/**
 * ============================================
 * ASYNC/AWAIT - PRACTICAL EXAMPLES
 * ============================================
 * 
 * Run this file with: node async-await-examples.js
 */

console.log("============================================");
console.log("ASYNC/AWAIT - PRACTICAL EXAMPLES");
console.log("============================================\n");

// Helper function to simulate async operations
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "John Doe", email: "john@example.com" });
      } else {
        reject("Invalid user ID");
      }
    }, 1000);
  });
}

function fetchUserPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "First Post", userId: userId },
        { id: 2, title: "Second Post", userId: userId }
      ]);
    }, 1000);
  });
}

// ============================================
// EXAMPLE 1: Basic async/await
// ============================================

console.log("EXAMPLE 1: Basic async/await\n");

async function getUserData() {
  console.log("Fetching user data...");
  const user = await fetchUser(1);
  console.log("✅ User fetched:", user);
  return user;
}

getUserData();

// ============================================
// EXAMPLE 2: Sequential operations
// ============================================

console.log("\nEXAMPLE 2: Sequential operations\n");

async function getUserWithPosts(userId) {
  try {
    console.log("Step 1: Fetching user...");
    const user = await fetchUser(userId);
    console.log("✅ User:", user.name);
    
    console.log("Step 2: Fetching posts...");
    const posts = await fetchUserPosts(userId);
    console.log("✅ Posts:", posts.length, "found");
    
    return { user, posts };
  } catch (error) {
    console.log("❌ Error:", error);
    throw error;
  }
}

setTimeout(() => {
  getUserWithPosts(1).then((result) => {
    console.log("Complete result:", result);
  });
}, 2000);

// ============================================
// EXAMPLE 3: Parallel execution
// ============================================

console.log("\nEXAMPLE 3: Parallel execution\n");

async function fetchDataParallel(userId) {
  console.log("Fetching user and posts in parallel...");
  const startTime = Date.now();
  
  // Both promises start at the same time
  const [user, posts] = await Promise.all([
    fetchUser(userId),
    fetchUserPosts(userId)
  ]);
  
  const endTime = Date.now();
  console.log(`✅ Both completed in ${endTime - startTime}ms`);
  console.log("User:", user.name);
  console.log("Posts:", posts.length);
  
  return { user, posts };
}

setTimeout(() => {
  fetchDataParallel(1);
}, 5000);

// ============================================
// EXAMPLE 4: Error handling
// ============================================

console.log("\nEXAMPLE 4: Error handling\n");

async function getUserWithErrorHandling(userId) {
  try {
    const user = await fetchUser(userId);
    console.log("✅ User found:", user.name);
    return user;
  } catch (error) {
    console.log("❌ Error caught:", error);
    return null; // Return default value instead of throwing
  } finally {
    console.log("✅ Finally block - always executes");
  }
}

setTimeout(() => {
  getUserWithErrorHandling(0); // Invalid ID
}, 8000);

// ============================================
// EXAMPLE 5: Multiple async operations
// ============================================

console.log("\nEXAMPLE 5: Multiple async operations\n");

async function processMultipleUsers() {
  const userIds = [1, 2, 3];
  
  console.log("Processing users sequentially:");
  for (const userId of userIds) {
    try {
      const user = await fetchUser(userId);
      console.log(`✅ User ${userId}: ${user.name}`);
    } catch (error) {
      console.log(`❌ User ${userId}: ${error}`);
    }
  }
  
  console.log("\nProcessing users in parallel:");
  const userPromises = userIds.map((id) => fetchUser(id));
  const results = await Promise.allSettled(userPromises);
  
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`✅ User ${userIds[index]}: ${result.value.name}`);
    } else {
      console.log(`❌ User ${userIds[index]}: ${result.reason}`);
    }
  });
}

setTimeout(() => {
  processMultipleUsers();
}, 11000);


