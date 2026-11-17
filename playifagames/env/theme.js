/* Theme: an explicit choice wins, otherwise follow the system. Loaded before the app so there is no flash. */
(function () { try { var t = localStorage.getItem('pig-theme'); if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t); } catch (e) {} })();
