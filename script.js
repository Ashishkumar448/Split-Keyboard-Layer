const keyTemplate = document.createElement('template');
keyTemplate.innerHTML = `
    <div class="container">
        <div class="face top" data-value></div>
        <div class="face front" data-tag></div>
        <div class="face left"></div>
        <div class="face right"></div>
        <div class="face back"></div>
    </div>
`;

const TAG = 'tag';
const VALUE = 'value';

class Key extends HTMLElement {
    static observedAttributes = [TAG, VALUE];

    constructor() {
        super();
        this.replaceChildren(keyTemplate.content.cloneNode(true));

        this.addEventListener('mousedown', () => {
            this.classList.add('keypress');
        })
        this.addEventListener('mouseup', () => {
            this.classList.remove('keypress');
        });
        this.addEventListener('mouseleave', (e) => {
            if (e.buttons > 0) {
                this.classList.remove('keypress');
            }
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === TAG) {
            const element = this.querySelector(`[data-${TAG}]`);
            element.innerHTML = newValue
        }
        if (name === VALUE) {
            const element = this.querySelector(`[data-${VALUE}]`);
            element.innerHTML = newValue
        }
    }
}

customElements.define('labs-key', Key);

document.addEventListener('scrollsnapchange', (event) => {
    const target = event.snapTargetBlock;
    const activeIndex = Array.from(target.parentNode.children).indexOf(target);
    Array.from(layers.children).forEach((item, index) => {
        if (index < activeIndex) {
            item.classList.add('before');
            item.classList.remove('active');
        } else if (index === activeIndex) {
            item.classList.add('active');
            item.classList.remove('before');
        } else {
            item.classList.remove('active', 'before');
        }
    })

});