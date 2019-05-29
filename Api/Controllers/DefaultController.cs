using Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using DataService;
using Microsoft.AspNetCore.Cors;
using System;
using System.Collections.Generic;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("AllowOrigin")]

    public class DefaultController : ControllerBase
    {
        // GET: api/Default
        [HttpGet(Name = "GetCategory")]
        public DataTable GetCategory()
        {
            DataTable dtCategory = new DataHelper().GetResults("SELECT * FROM CategoryMaster");
            return dtCategory;
        }

        [HttpPost(Name = "SaveItem")]
        public void SaveItem([FromBody] ItemMasterModel data)
        {
            DataTable dtItem = new DataHelper().PostValues("INSERT INTO ItemMaster VALUES ('" + data.ItemName + "' , '" + data.CategoryId + "')");
            return;
        }


        [HttpGet(Name = "GetItems")]
        public DataTable GetItems()
        {
            DataTable dtItems = new DataHelper().GetResults("SELECT * FROM ItemMaster");
            return dtItems;
        }
        [HttpGet(Name = "GetCustomers")]
        public DataTable GetCustomers()
        {
            DataTable dtItems = new DataHelper().GetResults("SELECT * FROM CustomerData");
            return dtItems;
        }

        [HttpGet(Name = "GetCustomersList")]
        public DataTable GetCustomersList(int id)
        {
            DataTable dtItems = new DataHelper().GetResults("SELECT TOP "+ id + " * FROM CustomerData");
            return dtItems;
        }
        [HttpPost(Name = "UpdateCustomerDetails")]
        public void UpdateCustomerDetails([FromBody] CustomerDataModel data)
        {
            DataTable dtUsers = new DataHelper().PostValues("UPDATE CustomerData SET CustomerName='" + data.CustomerName + "',CustomerEmail='" + data.CustomerEmail + "' WHERE CustomerID='" + data.CustomerID + "'");
            return;
        }

        [HttpPost(Name = "UpdateItemDetails")]
        public void UpdateItemDetails([FromBody] ItemMasterModel data)
        {
            DataTable dtUsers = new DataHelper().PostValues("UPDATE ItemMaster SET ItemName='" + data.ItemName + "' WHERE ItemID='" + data.ItemID+ "'");
            return;
        }


        [HttpGet(Name = "GetItemInventory")]
        public DataTable GetItemInventory()
        {
            DataTable dtItems = new DataHelper().GetResults("SELECT objInventory.ItemID, objInventory.ItemInventoryID, objInventory.ItemQuantity, objInventory.ItemRate, objInventory.CreateDate, objMaster.ItemName FROM ItemInventory objInventory INNER JOIN ItemMaster objMaster ON objInventory.ItemID = objMaster.ItemID; ");
            return dtItems;
        }
        [HttpGet(Name = "GetItemsCname")]
        public DataTable GetItemsCname()
        {
            DataTable dtItems = new DataHelper().GetResults("SELECT objItem.ItemID, objItem.ItemName, objItem.CategoryID, objCategory.CategoryName FROM ItemMaster objItem INNER JOIN CategoryMaster objCategory ON objItem.CategoryID = objCategory.CategoryID; ");
            return dtItems;
        }


     

        [HttpPost(Name = "SaveItemInventory")]
        public void SaveItemInventory([FromBody] ItemInventoryModel data)
        {
            DataTable dtInventory = new DataHelper().PostValues("INSERT INTO ItemInventory(ItemQuantity,ItemRate,ItemID) VALUES ('" + data.ItemQuantity + "' , '" + data.ItemRate + "', '" + data.ItemID + "')");
            return;
        }
        [HttpPost(Name = "UpdateItemInventory")]
        public void UpdateItemInventory([FromBody] UpdateItemModel data)
        {
            DataTable dtInventory = new DataHelper().PostValues("UPDATE ItemInventory SET ItemQuantity = '" + data.ItemQuantity + "',ItemRate = '" + data.ItemRate + "',CreateDate = getdate() WHERE ItemInventoryID = '" + data.ItemInventoryId + "';");
            return;
        }
        
        [HttpPost(Name = "SaveCustomerData")]
        public void SaveCustomerData([FromBody] CustomerDataModel data)
        {
            DataTable dtCustomerData = new DataHelper().PostValues("INSERT INTO CustomerData VALUES ('" + data.CustomerName + "' , '" + data.CustomerEmail + "')");
            return;
        }
        //[HttpGet(Name = "GetItemRate")]
        //public decimal GetItemRate(int id)
        //{
        //    DataTable ItemRate = new DataHelper().GetResults("Select * from ItemInventory where ItemID = " + id);
        //    if (ItemRate.Rows.Count > 0)
        //        return Convert.ToDecimal(ItemRate.Rows[0]["ItemRate"]);
        //    else
        //        return 0;
        //}

        [HttpPost(Name = "PostItemOrder")]
        public void PostItemOrder([FromBody] List<ItemOrderModel> AddedOrders)
        {
            foreach (var data in AddedOrders)
            {
                DataTable ItemData = new DataHelper().PostValues("INSERT INTO ItemOrder VALUES ('" + data.ItemOrderQuantity + "','" + data.TotalAmount + "', '" + data.ItemID + "','" + data.customerID + "')");
            }

            return;
        }
        [HttpGet(Name = "GetRateList")]
        public Dictionary<int, decimal> GetRateList()
        {
            DataTable dtRateList = new DataHelper().GetResults("Select distinct ItemRate,ItemID from ItemInventory where ItemInventoryID in(SELECT MAX(ItemInventoryID) FROM iteminventory GROUP BY ItemID)"); Dictionary<int, decimal> itemRateList = new Dictionary<int, decimal>();

            foreach (DataRow drRate in dtRateList.Rows)
            {
                itemRateList.Add(Convert.ToInt16(drRate["ItemID"]), Convert.ToDecimal(drRate["ItemRate"]));
            }
            return itemRateList;
        }

    }
}