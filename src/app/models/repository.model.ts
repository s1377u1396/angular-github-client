export interface Repository {
    id: number; // شناسه مخزن
    name: string; // نام مخزن
    description: string; // توضیحات مخزن
    stargazers_count: number; // تعداد ستاره‌ها
    forks_count: number; // تعداد فورک‌ها
    open_issues_count: number; // تعداد مشکلات باز
    owner: {
      login: string; // نام کاربری مالک مخزن
      avatar_url: string; // آدرس تصویر آواتار مالک
    };
}