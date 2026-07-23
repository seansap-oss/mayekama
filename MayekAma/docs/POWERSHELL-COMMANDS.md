# Windows PowerShell Commands

Use these after downloading `MayekAma_v0_1_Starter.zip`.

## 1. Create the project folder

```powershell
New-Item -ItemType Directory -Force -Path "D:\Mayekengine" | Out-Null
```

## 2. Remove any old test copy

```powershell
Remove-Item -Recurse -Force "D:\Mayekengine\MayekAma" -ErrorAction SilentlyContinue
```

## 3. Extract the ZIP

```powershell
Expand-Archive -Force "$env:USERPROFILE\Downloads\MayekAma_v0_1_Starter.zip" "D:\Mayekengine"
```

## 4. Go into the project

```powershell
cd "D:\Mayekengine\MayekAma"
```

## 5. Install website dependencies

```powershell
npm install
```

## 6. Run the website locally

```powershell
npm run dev
```

## 7. Open locally

```powershell
start http://localhost:5173
```

## 8. Build the website

```powershell
npm run build
```

## 9. Open Android keyboard project

Open this folder in Android Studio:

```powershell
D:\Mayekengine\MayekAmappsndroid-keyboard
```
