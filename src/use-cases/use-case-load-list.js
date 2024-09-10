import { asDOM, delay } from "../utils.js";

const app = document.getElementById("app");
app.classList.add(
  "flex",
  "flex-col",
  "gap-3",
  "items-center",
  "justify-center"
);
app.append(asDOM('<h1 class="font-bold text-zinc-100 text-2xl">Todos</h1>'));

const fallback = asDOM(
  `<ul class="flex flex-col gap-2 w-5/12 animate-pulse">
    <li class="flex h-4 gap-2">
        <span class="bg-zinc-800 rounded-full w-4"></span>
        <span class="bg-zinc-800 rounded-sm flex-1"></span>
    </li>
    <li class="flex h-4 gap-2">
        <span class="bg-zinc-800 rounded-full w-4"></span>
        <span class="bg-zinc-800 rounded-sm flex-1"></span>
    </li>
    <li class="flex h-4 gap-2">
        <span class="bg-zinc-800 rounded-full w-4"></span>
        <span class="bg-zinc-800 rounded-sm flex-1"></span>
    </li>
  </ul>`
);

const myLazyElement = async () => {
  const element = asDOM(
    `<ul class="flex flex-col gap-2 items-center overflow-auto max-h-[350px]"></ul>`
  );

  await delay(2000);

  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();

  if (data && data.length > 0) {
    element.append(
      ...data.map((todo) =>
        asDOM(`
            <li class="flex w-full items-center gap-2 justify-start" id="${
              todo.id
            }">
                ${
                  todo.completed
                    ? '<i class="fa-regular fa-circle-check"></i>'
                    : '<i class="fa-regular fa-circle-xmark"></i>'
                }
               <span class="flex-1 text-left">${todo.title}</span>
            </li>
        `)
      )
    );
  }

  return element;
};

Suspense({
  onSuspensionStart: () => console.log("Suspension started."),
  target: app,
  fallback,
  lazyElement: myLazyElement,
  onSuspensionEnd: () => console.log("Suspension Ended."),
});
