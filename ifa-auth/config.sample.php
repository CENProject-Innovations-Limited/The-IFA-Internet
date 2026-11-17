<?php
/*
 * IFA Academy sign-in — settings
 * ------------------------------------------------------------------
 * 1. Copy this file to   config.php   (same folder).
 * 2. Fill in the database details from your hosting panel.
 * 3. Never share config.php. It is blocked from the web by .htaccess.
 */

// ── Database (from cPanel → MySQL Databases) ──────────────────────
const DB_DSN  = 'mysql:host=localhost;dbname=CHANGE_ME_dbname;charset=utf8mb4';
const DB_USER = 'CHANGE_ME_dbuser';
const DB_PASS = 'CHANGE_ME_dbpassword';

// ── Site ──────────────────────────────────────────────────────────
const SITE_URL  = 'https://ifainternet.org';   // no trailing slash
const AUTH_PATH = '/ifa-auth';                  // where this folder lives
const ACADEMY   = 'IFA Academy of Polymaths';

// How long a sign-in lasts (days)
const SESSION_DAYS = 7;

// ── Email for "forgot password" (optional) ────────────────────────
// Leave MAIL_FROM empty to turn email off: students then ask an admin
// for a new sign-in link. To turn it on, use an address on your domain,
// e.g. 'no-reply@ifainternet.org' (create it in cPanel → Email Accounts).
const MAIL_FROM = '';

// ── Protected areas ───────────────────────────────────────────────
// Folder (as a web path, with trailing slash) => who may enter.
// Roles: student, premium, admin. Only accounts with status "approved" get in.
// 'bridge' signs students into the app's own login screen automatically.
const PROTECTED_AREAS = [
  '/ifa-labs/ile-aro/' => [
    'name'   => 'Ilé Arọ́: IfaCAD and OrisaCAD Playground',
    'roles'  => ['student', 'premium', 'admin'],
    'bridge' => [],
  ],
  '/ifagram/kids/' => [
    'name'   => 'Ifagrams for Kids & Teens',
    'roles'  => ['student', 'premium', 'admin'],
    'bridge' => [],
  ],
  '/ifa-lens/playground/' => [
    'name'   => 'IfaLens Playground',
    'roles'  => ['student', 'premium', 'admin'],
    'bridge' => ['ifalens_user'],
  ],
  '/ifa-notebook/env-pro/' => [
    'name'   => 'IfaNotebook Env Pro',
    'roles'  => ['student', 'premium', 'admin'],
    'bridge' => ['ifanote_pro_user'],
  ],
];
