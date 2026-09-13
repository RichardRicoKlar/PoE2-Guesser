export function buildCommand(command) {
    let cmd = command.baseCommand;

    command.parameters.forEach(p => {
        const input = document.getElementById(p.name);
        if (!input) return; // Skip if input isn't found
        let value = input.value;
        if (value && value !== "") {
            if (p.template) value = p.template.replace("{value}", value);
            cmd += ` ${p.flag} ${value}`;
        }
    });

    return cmd;
}