const crypto = require("crypto");

/*
    - The previous implemenation had nested if blocks.
    - This one does not have nested if blocks and is much more readable
    - Use of early returns short circuits the complete function on invalid or unexpected input
    - The steps followed in the function are much more readable due to reduction on unnecessary conditions
    - 
*/
exports.deterministicPartitionKey = (event) => {
    const TRIVIAL_PARTITION_KEY = "0";
    const MAX_PARTITION_KEY_LENGTH = 256;
    
    // Early return in case event is null
    if (!event) return TRIVIAL_PARTITION_KEY;

    // Prepare candidate
    let candidate = event.partitionKey ?? crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");

    // Convert candidate to string if it is not a string
    if (typeof candidate !== "string") {
        candidate = JSON.stringify(candidate);
    }

    // Restrict the candidate lenght to max partition key length
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
        candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
    
    return candidate;
};