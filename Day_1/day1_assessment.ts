// global execution starts here

// var is function scoped
var company: string = "TechCorp";

// let and const are block scoped
let year: number = 2025;
const MAX_USERS: number = 3;

// basic data types
let name: string = "Ritesh";
let age: number = 22;
let isActive: boolean = true;
let score: null = null;
let salary: undefined = undefined;
let id: symbol = Symbol("userId");
let bigNumber: bigint = 9007199254740991n;
let skills: string[] = ["JS", "TS"];
let user: { name: string; age: number } = { name, age };

// normal function with type safety
function greet(username: string): string {
  return "Hello " + username;
}

// arrow function
const add = (a: number, b: number): number => a + b;

// closure to keep count private
function userCounter(): () => number {
  let count: number = 0;

  return function (): number {
    count++;
    return count;
  };
}

const incrementUser = userCounter();

// promise that returns user data
function fetchUserData(): Promise<{ id: number; name: string }> {
  return new Promise((resolve, reject) => {
    if (isActive) {
      resolve({ id: 1, name: "Ritesh" });
    } else {
      reject("User is inactive");
    }
  });
}

// async function with error handling
async function main(): Promise<void> {
  try {
    console.log(greet(name));
    console.log("Sum:", add(5, 3));

    console.log("User Count:", incrementUser());
    console.log("User Count:", incrementUser());

    const data = await fetchUserData();
    console.log("Fetched User:", data);

  } catch (error: unknown) {
    console.error("Error:", error);
  } finally {
    console.log("Program finished execution");
  }
}

main();


//  TypeScript Version
function multiply(a: number, b: number): number {
  return a * b;
}

//   INTERFACE (DTO)
interface UserDTO {
    id: number;
    name: string;
    email: string;
}


//   ASYNC FUNCTION (API CALL)
 
async function fetchUser(): Promise<UserDTO> {
    // Simulating API delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;

            if (success) {
                resolve({
                    id: 101,
                    name: "Ritesh Honule",
                    email: "ritesh@example.com"
                });
            } else {
                reject(new Error("Failed to fetch user"));
            }
        }, 1000);
    });
}


//   MAIN FUNCTION
 
async function main(): Promise<void> {
    try {
        const user = await fetchUser(); // wait for API response
        console.log("User fetched successfully:", user);
        console.log("Multiplication:", multiply(5, 10));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        } else {
            console.error("Unknown error occurred");
        }
    }
}

main();

