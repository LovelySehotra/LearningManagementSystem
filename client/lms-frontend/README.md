# LMS Frontend

### Setup instruction

1. Clone the project

```
git clone https://github.com/LovelySehotra/LearningManagementSystem.git
```

2. Move into the directory 

```
cd lms-frontend

```
3. install dependencies

```
npm i

```
4. run the server

```
npm run dev

```
### Setup instruction for tailwind 

[Tailwind offical instruction doc](https://tailwindcss.com/docs/guides/vite)

Add the following details in the plugin of tailwind config

```
  require("daisyui")
```

###  Adding pluging and dependencies

```
@reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp

```

### Configure auto import sort eslint
1. Install simple import sort
```
 npm i -D eslint-plugin-simple-import-sort

```
2. Add rule in `.eslint.cjs`
```
  'simple-import-sort/imports':'error'
```
3. add simple-import sort plugin in `.eslint.cjs`
```
 plugins: [...,'simple-import-sort']    
```
4. To enable auto import sort on filw save in vscode
    - Open `setting.json`
    - add the folling config

```
     "editor.codeActionsOnSave": {
        "source.fixAll.eslint":true 
    }
```