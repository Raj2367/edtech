/**
 * Consistent API responses across backend.
 * Useful for debugging, logs, and frontend expectations.
 */
export function success<T>(res: any, data: T, status = 200) {
  return res.status(status).json({ success: true, data });
}

export function failure(res: any, message: string, status = 400) {
  return res.status(status).json({ success: false, message });
}
