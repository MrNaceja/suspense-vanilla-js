const fallback = document.createElement("h1");
fallback.classList.add("font-bold", "text-zinc-100", "text-2xl");
fallback.innerText = "Loading...";
const myLazyElement = async () => {
  const list = document.createElement("ul");
  //   const res = fetch("");
  //   const data = res.json();
  const data = ["banana", "mingau", "teste"];

  list.append(
    ...data.map((v) => {
      const item = document.createElement("li");
      item.innerText = v;
      return item;
    })
  );

  await new Promise((ok) => setTimeout(ok, 2000)); // Fake Delay to show fallback

  return list;
};

Suspense({
  target: document.getElementById("app"),
  fallback,
  lazyElement: myLazyElement,
});
