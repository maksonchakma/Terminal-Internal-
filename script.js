document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("cmd");
    const output = document.getElementById("output");

    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const command = input.value.trim();
            processCommand(command);
            input.value = "";
        }
    });

    function processCommand(command) {
        if (command) {
            const commandOutput = document.createElement("div");
            commandOutput.textContent = `> ${command}`;
            output.appendChild(commandOutput);

            // Process the command (You can add more commands here)
            if (command.toLowerCase() === "hello") {
                const response = document.createElement("div");
                response.textContent = "Hello, user!";
                output.appendChild(response);
            } else {
                const response = document.createElement("div");
                response.textContent = `Unknown command: ${command}`;
                output.appendChild(response);
            }

            // Scroll to the bottom of the output
            output.scrollTop = output.scrollHeight;
        }
    }
});
