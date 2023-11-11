<script lang="ts">
  import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
  import { commonmark } from "@milkdown/preset-commonmark";
  import { nord } from "@milkdown/theme-nord";

  function editor(dom: HTMLElement) {
    // to obtain the editor instance we need to store a reference of the editor.
    const markdown = `# Milkdown Svelte Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Svelte**.`;
    const MakeEditor = Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, dom);
        ctx.set(defaultValueCtx, markdown);
      })
      .config(nord)
      .use(commonmark)
      .create();
    MakeEditor.then((editor) => {
      // here you have access to the editor instance.
    });
  }
</script>

<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>

<h1>Welcome to SvelteKit</h1>
<div use:editor />
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>