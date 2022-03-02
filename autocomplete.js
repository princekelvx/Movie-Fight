const creatAutocomplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
  <label><strong>Search</strong></label>
  <input class="input"/>
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-menu results"></div>
    </div>
  </div>
`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const wrapper = root.querySelector(".results");

  const onInput = async (e) => {
    const items = await fetchData(e.target.value);

    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    wrapper.innerHTML = " ";
    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);

      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      wrapper.append(option);
    }
  };
  input.addEventListener("input", debounce(onInput));

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
