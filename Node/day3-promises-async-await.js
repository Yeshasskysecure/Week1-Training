/**
 * ============================================
 * DAY 3: PROMISES & ASYNC/AWAIT IN NODE.JS
 * ============================================
 * 
 * This tutorial covers:
 * 1. Understanding Promises
 * 2. Creating Promises
 * 3. Promise Methods (then, catch, finally)
 * 4. Promise Chaining
 * 5. Promise.all, Promise.race, Promise.allSettled
 * 6. async/await Syntax
 * 7. Error Handling with async/await
 * 8. Converting Callbacks to Promises
 */

console.log("============================================");
console.log("DAY 3: PROMISES & ASYNC/AWAIT TUTORIAL");
console.log("============================================\n");

// ============================================
// PART 1: UNDERSTANDING PROMISES
// ============================================

/**
 * WHAT IS A PROMISE?
 * 
 * A Promise is an object that represents the eventual completion (or failure)
 * of an asynchronous operation. It has three states:
 * 1. PENDING: Initial state, neither fulfilled nor rejected
 * 2. FULFILLED: Operation completed successfully
 * 3. REJECTED: Operation failed
 * 
 * Think of it like ordering food:
 * - You place an order (PENDING)
 * - You either get your food (FULFILLED) or something goes wrong (REJECTED)
 */

console.log("--- PART 1: BASIC PROMISE ---\n");

// Example 1: Creating a simple Promise
// 
// WHAT ARE resolve AND reject?
// =============================
// resolve and reject are FUNCTIONS provided by JavaScript
// - resolve() = Call this when operation SUCCEEDS (pass the result)
// - reject()  = Call this when operation FAILS (pass the error)
//
// Think of it like:
// - resolve("data") → "I succeeded! Here's the data" → goes to .then()
// - reject("error") → "I failed! Here's the error" → goes to .catch()

const myFirstPromise = new Promise((resolve, reject) => {
  // Simulate an async operation (like fetching data)
  setTimeout(() => {
    const success = true; // Change to false to see rejection
    
    if (success) {
      // SUCCESS: Call resolve() with the result
      // This will trigger the .then() handler
      resolve("Promise resolved! Data fetched successfully.");
    } else {
      // FAILURE: Call reject() with the error
      // This will trigger the .catch() handler
      reject("Promise rejected! Error occurred.");
    }
  }, 1000);
});

// Using the promise with .then() and .catch() instead of try catch block
myFirstPromise
  .then((result) => {
    console.log("✅ Success:", result);
  })
  .catch((error) => {
    console.log("❌ Error:", error);
  });

// Wait for the promise to complete before continuing
setTimeout(() => {
  console.log("\n");

  // ============================================
  // PART 2: PROMISE WITH REAL-WORLD EXAMPLE
  // ============================================

  console.log("--- PART 2: REAL-WORLD PROMISE EXAMPLE ---\n");

  // Simulating fetching user data from a database
  function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userId > 0) {
          resolve({
            id: userId,
            name: "John Doe",
            email: "john@example.com",
            age: 30
          });
        } else {
          reject("Invalid user ID");
        }
      }, 1500);
    });
  }

  // Using the promise
  fetchUserData(1)
    .then((user) => {
      console.log("✅ User data received:", user);
      return user; // Pass data to next .then()
    })
    .then((user) => {
      console.log(`   User name: ${user.name}`);
      console.log(`   User email: ${user.email}`);
    })
    .catch((error) => {
      console.log("❌ Error fetching user:", error);
    });

  setTimeout(() => {
    console.log("\n");

    // ============================================
    // PART 3: PROMISE CHAINING
    // ============================================

    console.log("--- PART 3: PROMISE CHAINING ---\n");

    // Example: Multiple async operations that depend on each other
    function checkUserExists(userId) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (userId === 1) {
            resolve({ exists: true, userId: 1 });
          } else {
            reject("User does not exist");
          }
        }, 500);
      });
    }

    function getUserProfile(userId) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            userId: userId,
            bio: "Software Developer",
            location: "New York"
          });
        }, 500);
      });
    }

    function getUserPosts(userId) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            { id: 1, title: "First Post", content: "Hello World!" },
            { id: 2, title: "Second Post", content: "Learning Node.js" }
          ]);
        }, 500);
      });
    }

    // Chaining promises - each .then() receives the result from previous promise
    checkUserExists(1)
      .then((result) => {
        console.log("✅ Step 1: User exists", result);
        return getUserProfile(result.userId);
      })
      .then((profile) => {
        console.log("✅ Step 2: Profile fetched", profile);
        return getUserPosts(profile.userId);
      })
      .then((posts) => {
        console.log("✅ Step 3: Posts fetched", posts);
        console.log(`   Total posts: ${posts.length}`);
      })
      .catch((error) => {
        console.log("❌ Error in chain:", error);
      });

    setTimeout(() => {
      console.log("\n");

      // ============================================
      // PART 4: PROMISE UTILITY METHODS
      // ============================================

      console.log("--- PART 4: PROMISE UTILITY METHODS ---\n");

      // Promise.all() - Waits for ALL promises to resolve    3 promises .all, .allSertteled and .race
      console.log("1. Promise.all() - All promises must succeed:");
      const promise1 = Promise.resolve("Data 1");
      const promise2 = new Promise((resolve) => setTimeout(() => resolve("Data 2"), 1000));
      const promise3 = new Promise((resolve) => setTimeout(() => resolve("Data 3"), 2000));

      Promise.all([promise1, promise2, promise3])
        .then((results) => {
          console.log("✅ All promises resolved:", results);
          console.log("   Results:", results.join(", "));
        })
        .catch((error) => {
          console.log("❌ One promise failed:", error);
        });

      setTimeout(() => {
        console.log("\n");

        // Promise.race() - Returns the first promise that resolves/rejects
        console.log("2. Promise.race() - First to finish wins:");
        const slowPromise = new Promise((resolve) => setTimeout(() => resolve("Slow"), 3000));
        const fastPromise = new Promise((resolve) => setTimeout(() => resolve("Fast"), 1000));

        Promise.race([slowPromise, fastPromise])
          .then((result) => {
            console.log("✅ Winner:", result);
          });

        setTimeout(() => {
          console.log("\n");

          // Promise.allSettled() - Waits for all promises (success or failure)
          console.log("3. Promise.allSettled() - All promises finish (success or failure):");
          const successPromise = Promise.resolve("Success");
          const failPromise = Promise.reject("Failed");

          Promise.allSettled([successPromise, failPromise])
            .then((results) => {
              console.log("✅ All promises settled:");
              results.forEach((result, index) => {
                if (result.status === "fulfilled") {
                  console.log(`   Promise ${index + 1}: ✅ ${result.value}`);
                } else {
                  console.log(`   Promise ${index + 1}: ❌ ${result.reason}`);
                }
              });
            });

          setTimeout(() => {
            console.log("\n");

            // ============================================
            // PART 5: ASYNC/AWAIT - THE MODERN WAY
            // ============================================

            console.log("--- PART 5: ASYNC/AWAIT ---\n");

            /**
             * ASYNC/AWAIT
             * 
             * async/await is syntactic sugar over Promises that makes
             * asynchronous code look and behave more like synchronous code.
             * 
             * Rules:
             * - async function always returns a Promise
             * - await can only be used inside an async function
             * - await pauses the execution until the promise resolves
             */

            // Example 1: Basic async/await
            async function fetchData() {
              console.log("Fetching data...");
              
              // Simulate API call
              const data = await new Promise((resolve) => {
                setTimeout(() => {
                  resolve({ id: 1, name: "Async Data" });
                }, 1000);
              });
              
              console.log("✅ Data received:", data);
              return data;
            }

            // Calling async function
            fetchData().then((result) => {
              console.log("   Function returned:", result);
            });

            setTimeout(() => {
              console.log("\n");

              // Example 2: Using async/await with our previous functions
              async function getUserDataComplete(userId) {
                try {
                  console.log("Fetching complete user data...");
                  
                  const user = await checkUserExists(userId);
                  console.log("✅ User exists:", user);
                  
                  const profile = await getUserProfile(user.userId);
                  console.log("✅ Profile:", profile);
                  
                  const posts = await getUserPosts(profile.userId);
                  console.log("✅ Posts:", posts);
                  
                  return {
                    user: user,
                    profile: profile,
                    posts: posts
                  };
                } catch (error) {
                  console.log("❌ Error:", error);
                  throw error; // Re-throw to let caller handle it
                }
              }

              getUserDataComplete(1)
                .then((completeData) => {
                  console.log("\n✅ Complete data structure:");
                  console.log(JSON.stringify(completeData, null, 2));
                });

              setTimeout(() => {
                console.log("\n");

                // ============================================
                // PART 6: ERROR HANDLING WITH ASYNC/AWAIT
                // ============================================

                console.log("--- PART 6: ERROR HANDLING ---\n");

                async function fetchWithErrorHandling(userId) {
                  try {
                    const user = await checkUserExists(userId);
                    const profile = await getUserProfile(user.userId);
                    return { user, profile };
                  } catch (error) {
                    console.log("❌ Caught error:", error);
                    // Return a default value or re-throw
                    return { error: error, user: null, profile: null };
                  } finally {
                    console.log("✅ Finally block - always executes");
                  }
                }

                // Test with valid ID
                fetchWithErrorHandling(1).then((result) => {
                  console.log("Result:", result);
                });

                setTimeout(() => {
                  console.log("\n");

                  // Test with invalid ID
                  fetchWithErrorHandling(0).then((result) => {
                    console.log("Result with error:", result);
                  });

                  setTimeout(() => {
                    console.log("\n");

                    // ============================================
                    // PART 7: PARALLEL EXECUTION WITH ASYNC/AWAIT
                    // ============================================

                    console.log("--- PART 7: PARALLEL EXECUTION ---\n");

                    // Sequential (slow) - one after another
                    async function fetchSequential() {
                      console.log("Sequential execution:");
                      const start = Date.now();
                      
                      const user = await checkUserExists(1);
                      const profile = await getUserProfile(1);
                      const posts = await getUserPosts(1);
                      
                      const end = Date.now();
                      console.log(`   Time taken: ${end - start}ms`);
                      return { user, profile, posts };
                    }

                    // Parallel (fast) - all at once
                    async function fetchParallel() {
                      console.log("Parallel execution:");
                      const start = Date.now();
                      
                      // All promises start at the same time
                      const [user, profile, posts] = await Promise.all([
                        checkUserExists(1),
                        getUserProfile(1),
                        getUserPosts(1)
                      ]);
                      
                      const end = Date.now();
                      console.log(`   Time taken: ${end - start}ms`);
                      return { user, profile, posts };
                    }

                    fetchSequential().then(() => {
                      setTimeout(() => {
                        fetchParallel();
                      }, 2000);
                    });

                    setTimeout(() => {
                      console.log("\n");

                      // ============================================
                      // PART 8: CONVERTING CALLBACKS TO PROMISES
                      // ============================================

                      console.log("--- PART 8: CALLBACK TO PROMISE ---\n");

                      // Old callback style
                      function callbackStyleFunction(data, callback) {
                        setTimeout(() => {
                          if (data) {
                            callback(null, `Processed: ${data}`);
                          } else {
                            callback("No data provided", null);
                          }
                        }, 1000);
                      }

                      // Convert to Promise
                      function promiseStyleFunction(data) {
                        return new Promise((resolve, reject) => {
                          setTimeout(() => {
                            if (data) {
                              resolve(`Processed: ${data}`);
                            } else {
                              reject("No data provided");
                            }
                          }, 1000);
                        });
                      }

                      // Using callback (old way)
                      console.log("1. Callback style:");
                      callbackStyleFunction("Hello", (error, result) => {
                        if (error) {
                          console.log("❌ Error:", error);
                        } else {
                          console.log("✅ Result:", result);
                        }
                      });

                      setTimeout(() => {
                        console.log("\n2. Promise style:");
                        promiseStyleFunction("Hello")
                          .then((result) => console.log("✅ Result:", result))
                          .catch((error) => console.log("❌ Error:", error));

                        setTimeout(() => {
                          console.log("\n3. Async/await style:");
                          (async () => {
                            try {
                              const result = await promiseStyleFunction("Hello");
                              console.log("✅ Result:", result);
                            } catch (error) {
                              console.log("❌ Error:", error);
                            }
                          })();

                          setTimeout(() => {
                            console.log("\n");

                            // ============================================
                            // PART 9: PRACTICAL EXAMPLE - FILE OPERATIONS
                            // ============================================

                            console.log("--- PART 9: PRACTICAL EXAMPLE ---\n");

                            const fs = require('fs').promises;
                            const path = require('path');

                            // Example: Reading multiple files in parallel
                            async function readMultipleFiles() {
                              try {
                                const files = ['package.json', 'app.js'];
                                
                                console.log("Reading files in parallel...");
                                const [packageContent, appContent] = await Promise.all([
                                  fs.readFile('package.json', 'utf8'),
                                  fs.readFile('app.js', 'utf8')
                                ]);
                                
                                console.log("✅ package.json length:", packageContent.length, "characters");
                                console.log("✅ app.js length:", appContent.length, "characters");
                                
                                return { packageContent, appContent };
                              } catch (error) {
                                console.log("❌ Error reading files:", error.message);
                              }
                            }

                            readMultipleFiles();

                            setTimeout(() => {
                              console.log("\n============================================");
                            }, 2000);
                          }, 2000);
                        }, 2000);
                      }, 2000);
                    }, 2000);
                  }, 2000);
                }, 2000);
              }, 2000);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }, 2000);
}, 2000);

