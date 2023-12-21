export const defineSmartImage = () => {
  class LivePreviewSection extends HTMLElement {
    static observedAttributes = ["prompt"];

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) {
        return;
      }
      this.shadowRoot.innerHTML = `<img src="" width="25%" height="25%" /> `;
    }

    // async connectedCallback() {
    //   // const response = await fetch('/api/smart-image/?prompt=a black dog');
    //   const response = await fetch("/api/smart-image/?prompt=230");
    //   const data = await response.json();
    //   const t = data.src; // 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-5JpFd4jtMI6LJdl3GcYXOx4L/user-E7WwzrUzkTnBegZHzBKhD4sG/img-EkiH6eELsDHTDDVSBlajE0Nh.png?st=2023-12-21T08%3A22%3A57Z&se=2023-12-21T10%3A22%3A57Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-20T23%3A05%3A34Z&ske=2023-12-21T23%3A05%3A34Z&sks=b&skv=2021-08-06&sig=H8lgueRNy0gl/njlqcLhCf7sOlTgZOIS0s28nFCAFIs%3D';
    //   this.shadowRoot?.querySelector("img")?.setAttribute("src", t);
    // }

    async attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ) {
      //   console.log(
      //     `Attribute ${name} has changed from ${oldValue} to ${newValue}.`
      //   );

      if (name === "prompt") {
        const response = await fetch(`/api/smart-image/?prompt=${newValue}`);
        const data = await response.json();
        const t = data.src; // 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-5JpFd4jtMI6LJdl3GcYXOx4L/user-E7WwzrUzkTnBegZHzBKhD4sG/img-EkiH6eELsDHTDDVSBlajE0Nh.png?st=2023-12-21T08%3A22%3A57Z&se=2023-12-21T10%3A22%3A57Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-20T23%3A05%3A34Z&ske=2023-12-21T23%3A05%3A34Z&sks=b&skv=2021-08-06&sig=H8lgueRNy0gl/njlqcLhCf7sOlTgZOIS0s28nFCAFIs%3D';
        this.shadowRoot?.querySelector("img")?.setAttribute("src", t);
      }
    }
  }

  customElements.define("smart-image", LivePreviewSection);
};
