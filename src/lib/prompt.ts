// --- Imports ---
import { v4 as uuidv4 } from 'uuid';

// --- Types and Interfaces ---

interface Variable {
  key: string;
  value: string;
}

class PromptFragment {
  id: string;
  private _content: string;
  private _variables: Variable[];

  constructor(content: string, variables: Variable[] = []) {
    this.id = uuidv4();
    this._content = content;
    this._variables = variables;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get variables(): Variable[] {
    return this._variables;
  }

  // Method to update a variable
  updateVariable(key: string, value: string): void {
    const variable = this._variables.find(v => v.key === key);
    if (variable) {
      variable.value = value;
    } else {
      this._variables.push({ key, value });
    }
  }

  // Method to get rendered content
  getRenderedContent(): string {
    return this._variables.reduce((content, variable) => 
      content.replace(`{${variable.key}}`, variable.value), this._content);
  }
}

class ComplexPrompt {
  private _fragments: PromptFragment[];

  constructor(fragments: PromptFragment[]) {
    this._fragments = fragments;
  }

  get fragments(): PromptFragment[] {
    return this._fragments;
  }

  // Method to add a new fragment
  addFragment(fragment: PromptFragment): void {
    this._fragments.push(fragment);
  }

  // Method to get rendered complex prompt
  getRenderedContent(): string {
    return this._fragments.map(fragment => fragment.getRenderedContent()).join(' ');
  }

  // Method to introspect the complex prompt
  introspect(): void {
    console.log("Fragments in the Complex Prompt:");
    this._fragments.forEach(fragment => {
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

  // Introspecting the complex prompt
  complexPrompt.introspect();

  // Updating a variable
  historyFragment.updateVariable("subject", "ancient Greece");

  // Displaying the updated complex prompt
  console.log(complexPrompt.getRenderedContent());
};

main();
