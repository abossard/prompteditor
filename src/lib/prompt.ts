// --- Imports ---
import { v4 as uuidv4 } from 'uuid';

// --- Types and Interfaces ---

export interface Variable {
    key: string;
    value: string;
}

export class PromptFragment {
    id: string;
    content: string;
    variables: Variable[];

    constructor(content: string, variables: Variable[] = []) {
        this.id = uuidv4();
        this.content = content;
        this.variables = variables;
    }

    // Method to update a variable
    updateVariable(key: string, value: string): void {
        const variable = this.variables.find(v => v.key === key);
        if (variable) {
            variable.value = value;
        } else {
            this.variables.push({ key, value });
        }
    }

    // Method to get rendered content
    toString(): string {
        return this.variables.reduce((content, variable) =>
            content.replace(`{${variable.key}}`, variable.value), this.content);
    }
}

export class ComplexPrompt {
    fragments: PromptFragment[];

    constructor(fragments: PromptFragment[]) {
        this.fragments = fragments;
    }

    // Method to add a new fragment
    addFragment(fragment: PromptFragment): void {
        this.fragments.push(fragment);
    }

    // Method to get rendered complex prompt
    toString(): string {
        return this.fragments.map(fragment => fragment.toString()).join(' ');
    }

    // Method to introspect the complex prompt
    introspect(): void {
        console.log("Fragments in the Complex Prompt:");
        this.fragments.forEach(fragment => {
            console.log(`ID: ${fragment.id}, Content: ${fragment.getRenderedContent()}`);
        });
    }
}

// --- Example Usage ---
const main = () => {
    // Creating fragments
    const generalInfoFragment = new PromptFragment("Tell me about {topic}.", [{ key: "topic", value: "artificial intelligence" }]);
    const historyFragment = new PromptFragment("What is the history of {subject}?", [{ key: "subject", value: "the Roman Empire" }]);

    // Creating a complex prompt
    const complexPrompt = new ComplexPrompt([generalInfoFragment, historyFragment]);

    // Test: Check initial complex prompt output
    const initialOutput = complexPrompt.toString();
    console.assert(initialOutput === "Tell me about artificial intelligence. What is the history of the Roman Empire?",
        `Test failed: Expected initial output to match, but got: ${initialOutput}`);

    // Updating a variable
    historyFragment.updateVariable("subject", "ancient Greece");

    // Test: Check updated complex prompt output
    const updatedOutput = complexPrompt.toString();
    console.assert(updatedOutput === "Tell me about artificial intelligence. What is the history of ancient Greece?",
        `Test failed: Expected updated output to match, but got: ${updatedOutput}`);

    // Output results if tests pass
    console.log("All tests passed!");
};

main();
