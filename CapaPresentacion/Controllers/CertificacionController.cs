using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CapaPresentacion.Controllers
{
    public class CertificacionController : Controller
    {
      
        public ActionResult AsignarInspector()
        {
            return View();
        }

        public ActionResult Inspeccion()
        {
            return View();
        }
        public ActionResult ConsultarSolicitudPartial()
        {
            return PartialView("~/Views/Views_Partial/_ConsultarSolicitudPartial.cshtml");
        }
    }
}