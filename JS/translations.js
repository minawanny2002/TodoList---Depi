// JS/translations.js
export const translations = {
  en: {
    // --- Sign in ---
    signin_title: "Login",
    signin_email: "Enter your email",
    signin_password: "Enter your password",
    signin_login: "Login",
    signin_noaccount: "Don't Have An Account ?",
    signin_signup: "Sign up",
    signin_email_not_found: "Email Not Found",
    signin_wrong_password: "Password Wrong",

    // --- Register ---
    register_title: "Signup",
    register_first: "First Name",
    register_last: "Last Name",
    register_email: "Email",
    register_password: "Password",
    register_signup: "Sign Up",
    register_haveaccount: "Already Have An Account ?",
    register_signin: "Sign in",
    register_success: "Successful Registration",
    register_email_exists: "Email Already Exists",
    register_first_invalid: "First Name Must Be At Least 3 Characters",
    register_last_invalid: "Last Name Must Be At Least 3 Characters",
    register_email_invalid: "Enter A Valid Email",
    register_password_invalid: "Password Must be At Least 8 Characters Or Numbers",

    // --- Home ---
    home_title: "TODO List",
    home_logout: "Log Out",
    home_todo: "Todo",
    home_done: "Done",
    home_task_label: "Task",
    home_task_placeholder: "Enter Your Task",
    home_submit: "Submit",
    home_update: "Update",
    home_table_index: "Index",
    home_table_task: "Task",
    home_table_edit: "Edit",
    home_table_delete: "Delete",
    home_table_done: "Done",
    home_task_invalid: "Task must contain at least 3 valid characters"
  },

  ar: {
    // --- Sign in ---
    signin_title: "تسجيل الدخول",
    signin_email: "أدخل بريدك الإلكتروني",
    signin_password: "أدخل كلمة المرور",
    signin_login: "تسجيل الدخول",
    signin_noaccount: "ليس لديك حساب ؟",
    signin_signup: "إنشاء حساب",
    signin_email_not_found: "البريد الإلكتروني غير موجود",
    signin_wrong_password: "كلمة المرور غير صحيحة",

    // --- Register ---
    register_title: "انشاء حساب جديد",
    register_first: "الاسم الأول",
    register_last: "الاسم الأخير",
    register_email: "البريد الإلكتروني",
    register_password: "كلمة المرور",
    register_signup: "تسجيل",
    register_haveaccount: "لديك حساب بالفعل ؟",
    register_signin: "تسجيل الدخول",
    register_success: "تم التسجيل بنجاح",
    register_email_exists: "البريد الإلكتروني موجود بالفعل",
    register_first_invalid: "الاسم الأول يجب أن يكون 3 أحرف على الأقل",
    register_last_invalid: "الاسم الأخير يجب أن يكون 3 أحرف على الأقل",
    register_email_invalid: "أدخل بريداً إلكترونياً صالحاً",
    register_password_invalid: "كلمة المرور يجب أن تكون 8 أحرف أو أرقام على الأقل",

    // --- Home ---
    home_title: "قائمة المهام",
    home_logout: "تسجيل خروج",
    home_todo: "المهام",
    home_done: "تم إنجازها",
    home_task_label: "المهمة",
    home_task_placeholder: "أدخل مهمتك",
    home_submit: "إضافة",
    home_update: "تحديث",
    home_table_index: "الرقم",
    home_table_task: "المهمة",
    home_table_edit: "تعديل",
    home_table_delete: "حذف",
    home_table_done: "تم",
    home_task_invalid: "المهمة يجب أن تحتوي على 3 أحرف صالحة على الأقل"
  }
};

export function initLanguage() {
  let currentLang = localStorage.getItem("lang") || "en";
  applyTranslations(currentLang);

  const toggleBtn = document.getElementById("langToggle");
  if (toggleBtn) {
    toggleBtn.textContent = currentLang === "en" ? "Arabic" : "English";

    toggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "ar" : "en";
      localStorage.setItem("lang", currentLang);
      applyTranslations(currentLang);
      toggleBtn.textContent = currentLang === "en" ? "Arabic" : "English";
    });
  }
}

export function t(key) {
  let lang = localStorage.getItem("lang") || "en";
  return translations[lang][key] || key;
}

function applyTranslations(lang) {
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    if (translations[lang][key]) {
      if (el.tagName.toLowerCase() === "input" || el.tagName.toLowerCase() === "textarea") {
        el.placeholder = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });
   if (lang === "ar") {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", "en");
  }
}
