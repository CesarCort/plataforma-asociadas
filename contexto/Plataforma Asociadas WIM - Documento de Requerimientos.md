# **Documento de Requerimientos \- Sistema de Gestión WIM**

## **1\. Introducción**

### **1.1 Propósito**

Este documento detalla los requerimientos para el desarrollo de una plataforma integral para WIM (Women in Mining) que permitirá gestionar membresías, eventos, beneficios y comunicaciones con sus asociadas, reemplazando el sistema actual basado en WooCommerce.

### **1.2 Alcance**

El sistema abarcará la gestión completa del ciclo de vida de membresías tanto individuales como empresariales, incluyendo inscripción, renovación, seguimiento de beneficios y eventos, así como la comunicación automatizada con los miembros.

### **1.3 Objetivos Principales**

* Centralizar la gestión de membresías en una única plataforma  
* Mejorar la trazabilidad de participación en eventos y uso de beneficios  
* Optimizar la experiencia de usuario tanto para administrativos como asociadas  
* Proporcionar independencia en la gestión de datos y reportes  
* Mantener un sistema eficiente en zonas de conectividad limitada

## **2\. Estructura de Usuarios**

### **2.1 Roles del Sistema**

#### **2.1.1 Administrativos**

1. Admin Complete  
   * Acceso total al sistema  
   * Gestión de usuarios y membresías  
   * Configuración de parámetros del sistema  
   * Administración de eventos y beneficios  
   * Acceso completo a reportes y métricas  
2. Admin Viewer  
   * Acceso de solo lectura  
   * Visualización de reportes y métricas  
   * Consulta de información de membresías  
   * Visualización de eventos y beneficios

#### **2.1.2 Miembros o Asociadas**

1. Individual  
   * Profesional  
     * Perfil con campos específicos  
     * Precio de membresía diferenciado  
     * Beneficios exclusivos  
   * Estudiante  
     * Perfil con campos específicos para estudiantes  
     * Precio preferencial  
     * Beneficios adaptados  
2. Empresarial  
   * Diferentes niveles de suscripción  
   * Gestión de datos empresariales  
   * Beneficios corporativos

## **3\. Módulos del Sistema**

### **3.1 Gestión de Usuarios y Autenticación**

#### **3.1.1 Registro y Acceso**

* Sistema de registro con validación de correo \- (Documento) \- Validamos la existe con RENIEC \- ES CARO  
* Login seguro  
* Recuperación de contraseña  
* Gestión de sesiones

#### **3.1.2 Gestión de Perfil**

* Actualización de datos personales  
* Cambio de contraseña  
* Historial de membresía

### **3.2 Gestión de Membresías**

#### **3.2.1 Configuración de Membresías ADMIN**

* Definición de tipos de membresía  
* Configuración de precios  
* Configuración de beneficios incluidos

#### **3.2.2 Proceso de Inscripción/Renovación**

* Formularios dinámicos según tipo de membresía  
* Sistema de pagos integrado  
* Generación automática de comprobantes  
* Activación inmediata post-pago

#### **3.2.3 Panel Administrativo**

* Dashboard con métricas clave  
  * Renovaciones pendientes  
  * Membresías activas/vencidas  
  * Participación en eventos  
  * Uso de beneficios  
* Exportación de reportes personalizados  
* Gestión de datos de miembros  
* Administración de documentos

### **3.3 Eventos y Beneficios**

#### **3.3.1 Gestión de Eventos**

* Creación y edición de eventos  
* Carga masiva de asistencias vía Excel  
* Registro de participación  
* Reportes de asistencia

#### **3.3.2 Gestión de Beneficios**

* Creación de beneficios  
  * Nombre  
  * Descripción  
  * Fecha inicio/fin  
  * Benefactor  
  * Banner/imagen  
* Registro de beneficios entregados  
* Administrativo: Carga masiva de entrega de beneficios.  
* Notas y observaciones  
* Trazabilidad de uso (De cara a las asociadas)

#### **3.3.3 Vista de Miembro**

* Calendario de eventos  
* Historial de participación  
* Beneficios disponibles  
* Registro de beneficios recibidos

### **3.4 Sistema de Comunicaciones**

#### **3.4.1 Configuración de Notificaciones**

* Gestión de recordatorios  
  * Días previos al vencimiento: 6, 3, 1 días previos  
  * Días posteriores al vencimiento: 3 y 5 días.  
  * Hora de envío  
  * Estado (activo/inactivo)  
* Plantillas de mensajes.  
* Programación de envíos.

  Dias posteriores : Por correo únicamente  
  Días precios: Por correo y whatsapp.

#### **3.4.2 Canales de Comunicación**

* Integración con WhatsApp  
* Correo electrónico  
* Notificaciones en plataforma

#### **3.4.3 Tipos de Comunicaciones**

* Recordatorios de renovación  
* Confirmaciones de pago  
* Saludos de cumpleaños  
* Notificaciones de eventos  
* Comunicaciones especiales

## **4\. Requerimientos Técnicos**

### **4.1 Rendimiento**

* Optimización para zonas de baja conectividad  
* Tiempo de carga máximo definido  
* Gestión eficiente de recursos

### **4.2 Seguridad**

* Autenticación segura  
* Encriptación de datos sensibles  
* Control de acceso basado en roles  
* Registro de auditoría de acciones críticas

### **4.3 Integración**

* API para comunicación con sistemas externos  
* Integración con pasarela de pagos \- Culqui  
* Conexión con servicios de mensajería \- Brevo

### **4.4 Almacenamiento**

* Gestión de documentos  
* Backup automático  
* Política de retención de datos

## **5\. Consideraciones Especiales**

### **5.1 Migración**

* Plan de migración desde WooCommerce  
* Preservación de datos históricos  
* Validación de integridad de datos

### **5.2 Capacitación**

* Manual de usuario  
* Documentación técnica  
* Sesiones de capacitación para administrativos

### **5.3 Mantenimiento**

* Actualizaciones del sistema  
* Soporte técnico  
* Monitoreo de rendimiento

## **6\. Criterios de Aceptación**

### **6.1 Funcionales**

* Completitud de funcionalidades descritas  
* Precisión en el procesamiento de datos  
* Correcta implementación de flujos de trabajo

### **6.2 Técnicos**

* Tiempo de respuesta aceptable  
* Disponibilidad del sistema  
* Seguridad de datos  
* Integridad de la información

### **6.3 Usuario**

* Usabilidad  
* Accesibilidad  
* Satisfacción del usuario

