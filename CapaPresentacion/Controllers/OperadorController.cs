using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CapaPresentacion.Controllers
{
    public class OperadorController : Controller
    {
        // GET: Operador
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FormularioEmisionAOCR()
        {
            return PartialView("~/Views/Views_Partial/_FormularioEmisionAOCR.cshtml");
        }

        public ActionResult ConsultarEmisionAOCR(int id)
        {
            return PartialView("~/Views/Views_Partial/_FormularioEmisionAOCR.cshtml");
        }



    }
}