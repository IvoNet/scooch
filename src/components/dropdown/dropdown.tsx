import { component$, type QRL } from "@builder.io/qwik";
import styles from "./dropdown.module.css";

interface DropdownProps {
  label: string;
  options: { value: string }[];
  onChange: QRL<(value: string) => void>;
  big?: boolean;
}

export const Dropdown = component$<DropdownProps>(
  ({ options, label, onChange, big = false }) => {
    return (
      <div class="dropdown d-grid gap-2">
        <button
          class={`btn btn-secondary dropdown-toggle ${styles["dropdown-btn"]} ${
            big ? "btn-lg" : ""
          } `}
          type="button"
          id="dropdownMenuButtonLight"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div>{label}</div>
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
