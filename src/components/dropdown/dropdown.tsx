import { component$, type QRL } from "@builder.io/qwik";

interface DropdownProps {
  label: string;
  options: { value: string }[];
  onChange: QRL<(value: string) => void>;
}

export const Dropdown = component$<DropdownProps>(
  ({ options, label, onChange }) => {
    return (
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButtonLight"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {label}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonLight">
          {options.map((option) => (
            <li key={option.value}>
              <a
                class="dropdown-item"
                href="#"
                onClick$={() => onChange(option.value)}
              >
                {option.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
