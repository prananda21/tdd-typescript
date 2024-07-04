import { logger } from "./app/logger";
import { web } from "./app/web";

const port: number = 3000;
web.listen(port, () => {
	logger.info(`Server running at http://localhost:${port}`);
});
