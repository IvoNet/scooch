import { component$, type QRL } from "@builder.io/qwik";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: QRL<(value: boolean) => void>;
}

export const Checkbox = component$<CheckboxProps>(
  ({ label, checked, onChange }) => {
    return (
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id={label}
          onChange$={() => onChange(!checked)}
        />
        <label class="form-check-label" for={label}>
          {label}
        </label>
      </div>
    );
  }
);
