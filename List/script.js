document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const taskInput = document.getElementById("taskInput")
  const addTaskButton = document.getElementById("addTask")
  const taskList = document.getElementById("taskList")

  // Load tasks from local storage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []

  // Function to save tasks to local storage
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  // Function to render tasks
  const renderTasks = () => {
    taskList.innerHTML = ""
    tasks.forEach((task, index) => {
      const li = document.createElement("li")
      li.className = `flex justify-between items-center p-3 ${task.completed ? "bg-green-100" : "bg-gray-100"} rounded-md transition duration-300 ease-in-out`
      li.innerHTML = `
                <span class="flex-grow cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}">${task.text}</span>
                <button class="text-red-500 hover:text-red-700 transition duration-300 ease-in-out ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            `

      // Toggle task completion
      li.querySelector("span").addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed
        saveTasks()
        renderTasks()
      })

      // Remove task
      li.querySelector("button").addEventListener("click", () => {
        tasks.splice(index, 1)
        saveTasks()
        renderTasks()
      })

      taskList.appendChild(li)
    })
  }

  // Function to add a new task
  const addTask = () => {
    const text = taskInput.value.trim()
    if (text) {
      tasks.push({ text, completed: false })
      taskInput.value = ""
      saveTasks()
      renderTasks()
    }
  }

  // Event listeners
  addTaskButton.addEventListener("click", addTask)
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask()
  })

  // Initial render
  renderTasks()
})

