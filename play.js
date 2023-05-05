   
class Draggable {
     
  constructor(el) {
          this.el = el;
          this.shiftX = null;
          this.shiftY = null;
          this.scrollInterval = null;
          this.onDown = "ontouchstart" in document.documentElement ? "touchstart" : "mousedown";
          this.onMove = "ontouchmove" in document.documentElement ? "touchmove" : "mousemove";
          this.onUp = "ontouchend" in document.documentElement ? "touchend" : "mouseup";
          this.onDownHandler = this.onDownHandler.bind(this);
          this.onMoveHandler = this.onMoveHandler.bind(this);
          this.onUpHandler = this.onUpHandler.bind(this);
          this.addEventHandlers();
        }
     
        addEventHandlers() {
          this.el.addEventListener(this.onDown, this.onDownHandler, { passive: false });
          this.el.addEventListener("dragstart", (e) => e.preventDefault());
          document.addEventListener(this.onUp, this.onUpHandler);
        }
     
        onDownHandler(e) {
          const pointer = e.type.startsWith("touch") ? e.touches[0] : e;
          this.getDragPointer(pointer.clientX, pointer.clientY);
          this.prepareElement();
          this.moveElementTo(pointer.pageX, pointer.pageY);
          document.addEventListener(this.onMove, this.onMoveHandler, { passive: false });
          this.scrollInterval = setInterval(this.checkAndScroll.bind(this), 50);
        }
     
        checkAndScroll() {
          const { top } = this.el.getBoundingClientRect();
          if (top < 0) {
            window.scrollBy(0, -50);
          }
        }
     
        getDragPointer(x, y) {
          const elRect = this.el.getBoundingClientRect();
          this.shiftX = x - elRect.left;
          this.shiftY = y - elRect.top;
        }
     
        prepareElement() {
          this.el.style.position = "absolute"; 
        }
  
        moveElementTo(x, y) {
          const leftPosition = x - this.shiftX < 0 ? 0 : x - this.shiftX;
          const topPosition = y - this.shiftY < 0 ? 0 : y - this.shiftY;
          this.el.style.left = `${leftPosition}px`;
          this.el.style.top = `${topPosition}px`;     
        }
     
        onMoveHandler(e) {
          const pointer = e.type.startsWith("touch") ? e.touches[0] : e;
          this.moveElementTo(pointer.pageX, pointer.pageY);
        }
     
        onUpHandler(e) {
          clearInterval(this.scrollInterval);
          document.removeEventListener(this.onMove, this.onMoveHandler);
        }
        
      }
     
const draggables = document.querySelectorAll(".draggable");
     
for (let draggable of draggables) {
        new Draggable(draggable);
      }
     
const resetBtn = document.getElementById('reset-btn')
      resetBtn.addEventListener('click',()=>{
        window.location.reload()
      })

    
      
      

  
