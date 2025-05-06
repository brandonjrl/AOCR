using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CapaPresentacion.Controllers
{
    public class InspectorController : Controller
    {
        // GET: Inspector
        public ActionResult RevisarDocumentacion()
        {
            return View();
        }

        public ActionResult Inspeccion()
        {
            return View();
        }
    }
}