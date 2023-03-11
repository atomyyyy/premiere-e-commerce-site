import React from 'react';
import * as styles from './Policy.module.css';

import Seo from '../Seo';

const Policy = () => {
  return (
    <div className={styles.root}>
      <Seo title={`Premiere | 條款及細則`} />
      <div className={styles.section}>
        <h3>1. 訂單安排</h3>
        <p>
          經郵寄公司寄出: 將於完成訂單後約3個工作天經平郵/順豐速遞寄出；如訂單因收貨地址不完善、多次派送均無人收件，收件人拒收包裹等原因而被退回，訂單將會自動取消；如客人要求重新安排寄出商品，必須於5個工作天內主動聯絡客服重新支付郵費。Premiere.hk保留處理或回收有關商品的權利並不會作另行通知及賠償。
        </p>
      </div>

      <div className={styles.section}>
        <h3>2. 預訂貨品</h3>
        <p>
          如客人所選購的商品未有現貨，備貨期約2-3星期，到貨後會盡快安排寄出。
        </p>
      </div>

      <div className={styles.section}>
        <h3>3. 退換政策</h3>
        <p>
          退換的商品必須與客人收到時相同，另須保留收到貨時的完整包裝(包括吊牌)，且無穿著痕跡，保持商品原樣，不得弄髒、清洗、改變或有磨損，每個訂單只可退換一次。
        </p>
      </div>

      <div className={styles.section}>
        <h3>4. 退回商品</h3>
        <p>
        如客人所選購的商品因品質問題需要退換，必須保留收據並於14天內聯絡客服。運送過程中有機會令包裝損壞，如包裝盒被壓至變形，於不影響商品使用的情況下將不會作出退換。購買後超過7天的商品將由Premiere.hk全權決定是否辦理退換貨。
        </p>
      </div>
    </div>
  );
};

export default Policy;
