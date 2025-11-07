/**
 * ============================================
 * API SIMULATION - PROMISES & ASYNC/AWAIT
 * ============================================
 * 
 * This script simulates real API calls to demonstrate
 * Promises and async/await in a practical scenario.
 * 
 * Run: node api-simulation.js
 */

console.log("============================================");
console.log("API SIMULATION - PROMISES & ASYNC/AWAIT");
console.log("============================================\n");

// ============================================
// SIMULATED API ENDPOINTS
// ============================================

// Simulate network delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simulate API response time (random between 500-2000ms)
function randomDelay() {
  return delay(Math.floor(Math.random() * 1500) + 500);
}

// ============================================
// API FUNCTIONS (Simulating REST API)
// ============================================

/**
 * Simulate fetching user data from API
 */
function fetchUserAPI(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId <= 0) {
        reject({ status: 404, message: "User not found" });
        return;
      }
      
      if (userId > 100) {
        reject({ status: 500, message: "Server error" });
        return;
      }
      
      resolve({
        status: 200,
        data: {
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`,
          role: "developer",
          createdAt: new Date().toISOString()
        }
      });
    }, Math.floor(Math.random() * 1000) + 500);
  });
}

/**
 * Simulate fetching user posts from API
 */
function fetchUserPostsAPI(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId <= 0) {
        reject({ status: 404, message: "User not found" });
        return;
      }
      
      resolve({
        status: 200,
        data: [
          { id: 1, userId: userId, title: "First Post", content: "Hello World!" },
          { id: 2, userId: userId, title: "Second Post", content: "Learning Node.js" },
          { id: 3, userId: userId, title: "Third Post", content: "Async/Await is awesome!" }
        ]
      });
    }, Math.floor(Math.random() * 1000) + 500);
  });
}

/**
 * Simulate fetching user comments from API
 */
function fetchUserCommentsAPI(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: [
          { id: 1, userId: userId, postId: 1, comment: "Great post!" },
          { id: 2, userId: userId, postId: 2, comment: "Very helpful!" }
        ]
      });
    }, Math.floor(Math.random() * 1000) + 500);
  });
}

/**
 * Simulate fetching all users from API
 */
function fetchAllUsersAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: [
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Smith", email: "jane@example.com" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com" }
        ]
      });
    }, 1000);
  });
}

/**
 * Simulate creating a new user (POST request)
 */
function createUserAPI(userData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userData.name || !userData.email) {
        reject({ status: 400, message: "Name and email are required" });
        return;
      }
      
      resolve({
        status: 201,
        data: {
          id: Math.floor(Math.random() * 1000),
          ...userData,
          createdAt: new Date().toISOString()
        }
      });
    }, 800);
  });
}

/**
 * Simulate updating user data (PUT request)
 */
function updateUserAPI(userId, userData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId <= 0) {
        reject({ status: 404, message: "User not found" });
        return;
      }
      
      resolve({
        status: 200,
        data: {
          id: userId,
          ...userData,
          updatedAt: new Date().toISOString()
        }
      });
    }, 600);
  });
}

/**
 * Simulate deleting a user (DELETE request)
 */
function deleteUserAPI(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId <= 0) {
        reject({ status: 404, message: "User not found" });
        return;
      }
      
      resolve({
        status: 200,
        message: `User ${userId} deleted successfully`
      });
    }, 500);
  });
}

// ============================================
// EXAMPLE 1: Basic API Call with Promise
// ============================================

console.log("EXAMPLE 1: Basic API Call with Promise\n");

fetchUserAPI(1)
  .then((response) => {
    console.log("✅ API Response:", response.status);
    console.log("   User:", response.data.name);
    console.log("   Email:", response.data.email);
  })
  .catch((error) => {
    console.log("❌ API Error:", error.status, error.message);
  });

// ============================================
// EXAMPLE 2: API Call with async/await
// ============================================

setTimeout(() => {
  console.log("\nEXAMPLE 2: API Call with async/await\n");

  async function getUserData(userId) {
    try {
      const response = await fetchUserAPI(userId);
      console.log("✅ User fetched:", response.data.name);
      return response.data;
    } catch (error) {
      console.log("❌ Error:", error.message);
      return null;
    }
  }

  getUserData(1);
}, 2000);

// ============================================
// EXAMPLE 3: Sequential API Calls
// ============================================

setTimeout(() => {
  console.log("\nEXAMPLE 3: Sequential API Calls (One after another)\n");

  async function getUserCompleteData(userId) {
    try {
      console.log("Step 1: Fetching user...");
      const userResponse = await fetchUserAPI(userId);
      console.log("✅ User:", userResponse.data.name);

      console.log("Step 2: Fetching posts...");
      const postsResponse = await fetchUserPostsAPI(userId);
      console.log("✅ Posts:", postsResponse.data.length, "posts found");

      console.log("Step 3: Fetching comments...");
      const commentsResponse = await fetchUserCommentsAPI(userId);
      console.log("✅ Comments:", commentsResponse.data.length, "comments found");

      return {
        user: userResponse.data,
        posts: postsResponse.data,
        comments: commentsResponse.data
      };
    } catch (error) {
      console.log("❌ Error in sequential calls:", error.message);
      throw error;
    }
  }

  getUserCompleteData(1)
    .then((data) => {
      console.log("\n✅ Complete data structure:");
      console.log("   User:", data.user.name);
      console.log("   Posts:", data.posts.length);
      console.log("   Comments:", data.comments.length);
    });
}, 5000);

// ============================================
// EXAMPLE 4: Parallel API Calls (Faster!)
// ============================================

setTimeout(() => {
  console.log("\nEXAMPLE 4: Parallel API Calls (All at once)\n");

  async function getUserCompleteDataParallel(userId) {
    try {
      console.log("Fetching user, posts, and comments in parallel...");
      const startTime = Date.now();

      // All API calls start at the same time
      const [userResponse, postsResponse, commentsResponse] = await Promise.all([
        fetchUserAPI(userId),
        fetchUserPostsAPI(userId),
        fetchUserCommentsAPI(userId)
      ]);

      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`✅ All API calls completed in ${duration}ms`);
      console.log("   User:", userResponse.data.name);
      console.log("   Posts:", postsResponse.data.length);
      console.log("   Comments:", commentsResponse.data.length);

      return {
        user: userResponse.data,
        posts: postsResponse.data,
        comments: commentsResponse.data,
        duration: duration
      };
    } catch (error) {
      console.log("❌ Error in parallel calls:", error.message);
      throw error;
    }
  }

  getUserCompleteDataParallel(1);
}, 9000);

// ============================================
// EXAMPLE 5: Error Handling with API Calls
// ============================================

setTimeout(() => {
  console.log("\nEXAMPLE 5: Error Handling with API Calls\n");

  async function getUserWithErrorHandling(userId) {
    try {
      const response = await fetchUserAPI(userId);
      console.log("✅ User fetched:", response.data.name);
      return response.data;
    } catch (error) {
      if (error.status === 404) {
        console.log("❌ User not found (404)");
      } else if (error.status === 500) {
        console.log("❌ Server error (500)");
      } else {
        console.log("❌ Unknown error:", error.message);
      }
      return null;
    } finally {
      console.log("✅ API call completed (finally block)");
    }
  }

  // Test with valid ID
  getUserWithErrorHandling(1);

  // Test with invalid ID
  setTimeout(() => {
    getUserWithErrorHandling(0);
  }, 2000);

  // Test with server error
  setTimeout(() => {
    getUserWithErrorHandling(101);
  }, 4000);
}, 13000);

// ============================================
// EXAMPLE 6: Creating and Updating Resources
// ============================================

setTimeout(() => {
  console.log("\nEXAMPLE 6: POST and PUT Requests\n");

  async function createAndUpdateUser() {
    try {
      // Create new user
      console.log("Creating new user...");
      const createResponse = await createUserAPI({
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "admin"
      });
      console.log("✅ User created:", createResponse.data.name);
      console.log("   ID:", createResponse.data.id);

      // Update user
      console.log("\nUpdating user...");
      const updateResponse = await updateUserAPI(createResponse.data.id, {
        name: "Alice Smith",
        role: "super-admin"
      });
      console.log("✅ User updated:", updateResponse.data.name);
      console.log("   New role:", updateResponse.data.role);

      return updateResponse.data;
    } catch (error) {
      console.log("❌ Error:", error.message);
      return null;
    }
  }

  createAndUpdateUser();
}, 20000);

// ============================================
// EXAMPLE 7: Fetching Multiple Users
// ============================================

setTimeout(() => {
  console.log("\nEXAMPLE 7: Fetching Multiple Users\n");

  async function fetchMultipleUsers(userIds) {
    console.log(`Fetching ${userIds.length} users...`);
    const startTime = Date.now();

    // Fetch all users in parallel
    const userPromises = userIds.map((id) => fetchUserAPI(id));
    const results = await Promise.allSettled(userPromises);

    const endTime = Date.now();

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`✅ User ${userIds[index]}: ${result.value.data.name}`);
      } else {
        console.log(`❌ User ${userIds[index]}: ${result.reason.message}`);
      }
    });

    console.log(`\n✅ Completed in ${endTime - startTime}ms`);
  }

  fetchMultipleUsers([1, 2, 3, 0, 5]); // One will fail (0)
}, 25000);

// ============================================
// EXAMPLE 8: Complex API Workflow
// ============================================

setTimeout(() => {
  console.log("\nEXAMPLE 8: Complex API Workflow\n");

  async function complexWorkflow() {
    try {
      console.log("Step 1: Fetching all users...");
      const allUsersResponse = await fetchAllUsersAPI();
      console.log(`✅ Found ${allUsersResponse.data.length} users`);

      console.log("\nStep 2: Fetching detailed data for each user...");
      const userDetailsPromises = allUsersResponse.data.map((user) =>
        fetchUserPostsAPI(user.id)
      );
      const postsResponses = await Promise.all(userDetailsPromises);

      console.log("✅ Fetched posts for all users");
      postsResponses.forEach((response, index) => {
        console.log(`   User ${allUsersResponse.data[index].name}: ${response.data.length} posts`);
      });

      console.log("\nStep 3: Creating a new user...");
      const newUserResponse = await createUserAPI({
        name: "New User",
        email: "newuser@example.com",
        role: "user"
      });
      console.log("✅ New user created:", newUserResponse.data.name);

      return {
        totalUsers: allUsersResponse.data.length + 1,
        postsCount: postsResponses.reduce((sum, res) => sum + res.data.length, 0)
      };
    } catch (error) {
      console.log("❌ Error in workflow:", error.message);
      return null;
    }
  }

  complexWorkflow().then((result) => {
    if (result) {
      console.log("\n✅ Workflow Summary:");
      console.log("   Total users:", result.totalUsers);
      console.log("   Total posts:", result.postsCount);
    }
  });
}, 32000);

// ============================================
// EXAMPLE 9: API Call with Retry Logic
// ============================================

setTimeout(() => {
  console.log("\nEXAMPLE 9: API Call with Retry Logic\n");

  async function fetchWithRetry(apiCall, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${maxRetries}...`);
        const response = await apiCall();
        console.log("✅ Success on attempt", attempt);
        return response;
      } catch (error) {
        console.log(`❌ Attempt ${attempt} failed:`, error.message);
        if (attempt === maxRetries) {
          throw new Error(`Failed after ${maxRetries} attempts`);
        }
        // Wait before retrying
        await delay(1000 * attempt); // Exponential backoff
      }
    }
  }

  // Simulate an API that might fail
  function unreliableAPI() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; // 50% chance of success
        if (success) {
          resolve({ status: 200, data: "Success!" });
        } else {
          reject({ status: 500, message: "Temporary failure" });
        }
      }, 500);
    });
  }

  fetchWithRetry(() => unreliableAPI())
    .then((response) => {
      console.log("✅ Final result:", response.data);
    })
    .catch((error) => {
      console.log("❌ All retries failed:", error.message);
    });
}, 40000);

// ============================================
// EXAMPLE 10: Rate-Limited API Calls
// ============================================

setTimeout(() => {
  console.log("\nEXAMPLE 10: Rate-Limited API Calls\n");

  async function fetchUsersWithRateLimit(userIds, maxConcurrent = 2) {
    console.log(`Fetching ${userIds.length} users (max ${maxConcurrent} concurrent)...`);
    const results = [];

    // Process in batches
    for (let i = 0; i < userIds.length; i += maxConcurrent) {
      const batch = userIds.slice(i, i + maxConcurrent);
      console.log(`\nProcessing batch: ${batch.join(", ")}`);

      const batchPromises = batch.map((id) => fetchUserAPI(id));
      const batchResults = await Promise.allSettled(batchPromises);

      batchResults.forEach((result, index) => {
        if (result.status === "fulfilled") {
          console.log(`✅ User ${batch[index]}: ${result.value.data.name}`);
          results.push(result.value.data);
        } else {
          console.log(`❌ User ${batch[index]}: ${result.reason.message}`);
        }
      });

      // Rate limiting: wait between batches
      if (i + maxConcurrent < userIds.length) {
        console.log("   Waiting before next batch...");
        await delay(1000);
      }
    }

    return results;
  }

  fetchUsersWithRateLimit([1, 2, 3, 4, 5], 2)
    .then((users) => {
      console.log(`\n✅ Successfully fetched ${users.length} users`);
    });
}, 50000);

// ============================================
// SUMMARY
// ============================================

setTimeout(() => {
  console.log("\n============================================");
  console.log("API SIMULATION SUMMARY");
  console.log("============================================");
  console.log("\n✅ Key Concepts Demonstrated:");
  console.log("1. Basic API calls with Promises");
  console.log("2. Async/await for cleaner code");
  console.log("3. Sequential vs Parallel API calls");
  console.log("4. Error handling in API calls");
  console.log("5. Creating and updating resources");
  console.log("6. Fetching multiple resources");
  console.log("7. Complex API workflows");
  console.log("8. Retry logic for unreliable APIs");
  console.log("9. Rate limiting for API calls");
  console.log("\n📝 Real-World Applications:");
  console.log("- Fetching data from REST APIs");
  console.log("- Handling API errors gracefully");
  console.log("- Optimizing API performance");
  console.log("- Managing API rate limits");
  console.log("- Implementing retry mechanisms");
  console.log("\n============================================");
}, 60000);


