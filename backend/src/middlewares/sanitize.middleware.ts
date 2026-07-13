import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para sanitizar inputs y prevenir XSS
 * Limpia caracteres peligrosos de strings en body, query y params
 */
export const sanitizeInput = (req: Request, _res: Response, next: NextFunction) => {
  // Sanitizar body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  // Sanitizar query
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  // Sanitizar params
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
};

/**
 * Recursivamente sanitiza un objeto
 * Convierte caracteres peligrosos en entidades HTML seguras
 */
function sanitizeObject(obj: any): any {
  if (!obj) return obj;

  // Si es un string, sanitizarlo
  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }

  // Si es un array, sanitizar cada elemento
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  // Si es un objeto, sanitizar cada propiedad
  if (typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }

  // Si es otro tipo (number, boolean, etc.), devolverlo sin cambios
  return obj;
}

/**
 * Sanitiza un string reemplazando caracteres peligrosos
 * Convierte <, >, ", ', & en entidades HTML
 */
function sanitizeString(str: string): string {
  if (!str) return str;

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return str.replace(/[&<>"'/]/g, (char) => map[char] || char);
}