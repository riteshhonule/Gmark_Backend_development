
// var is function scoped
var company: string = "TechCorp";

// let and const are block scoped
let year: number = 2025;
const MAX_USERS: number = 3;

// basic data types
let userName: string = "Ritesh";   
let age: number = 22;
let isActive: boolean = true;
let score: null = null;
let salary: undefined = undefined;

//  bigint 
let bigNumber: number = 9007199254740991;

let skills: string[] = ["JS", "TS"];
let user: { name: string; age: number } = { name: userName, age };

//  FUNCTIONS 

// normal function
function greet(username: string): string {
    return "Hello " + username;
}

// arrow function
const add = (a: number, b: number): number => a + b;

// closure example
function userCounter(): () => number {
    let count: number = 0;

    return function (): number {
        count++;
        return count;
    };
}

const incrementUser = userCounter();

// PROMISE 

function fetchUserData(): Promise<{ id: number; name: string }> {
    return new Promise((resolve, reject) => {
        if (isActive) {
            resolve({ id: 1, name: "Ritesh" });
        } else {
            reject(new Error("User is inactive"));
        }
    });
}

//  TYPESCRIPT FUNCTION 

function multiply(a: number, b: number): number {
    return a * b;
}

// INTERFACE (DTO)

interface UserDTO {
    id: number;
    name: string;
    email: string;
}

// / ASYNC API FUNCTION 

async function fetchUser(): Promise<UserDTO> {
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

//  SINGLE MAIN FUNCTION 

async function main(): Promise<void> {
    try {
        console.log(greet(userName));
        console.log("Sum:", add(5, 3));

        console.log("User Count:", incrementUser());
        console.log("User Count:", incrementUser());

        const basicUser = await fetchUserData();
        console.log("Fetched User Data:", basicUser);

        const apiUser = await fetchUser();
        console.log("Fetched API User:", apiUser);

        console.log("Multiplication:", multiply(5, 10));

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        } else {
            console.error("Unknown error occurred");
        }
    } finally {
        console.log("Program finished execution");
    }
}

// calling
main();






// ==========================  OUTPUT       =================================================


PS D:\G mark Software> npx ts-node Day1/day1_assessment.ts

Hello Ritesh
Hello Ritesh
Sum: 8
User Count: 1
User Count: 2
Fetched User Data: { id: 1, name: 'Ritesh' }
Fetched API User: { id: 101, name: 'Ritesh Honule', email: 'ritesh@example.com' }
Multiplication: 50
Program finished execution

