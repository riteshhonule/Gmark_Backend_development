//  Convert JavaScript Code → TypeScript
//  JavaScript Code

// function multiply(a, b) {
//   return a * b;
// }

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
